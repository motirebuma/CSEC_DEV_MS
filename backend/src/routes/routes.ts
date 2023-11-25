import express from 'express';
import { Request, Response } from 'express';
import Member from '../model/Member';
import Event from '../model/Event';
import ConnectToDatabase from '../config/db';
import multer = require('multer');
import fs from 'fs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../model/Admin';
import Message from '../model/Message';

import { authenticateAndAuthorizeAdmin, authenticateUser, authenticateUserOrAdmin } from '../middleware/auth';


const router = express.Router();
const uploadMiddleware = multer({dest: 'uploads/'});
// connect to db
ConnectToDatabase();

// api check
router.get('/', async(req: Request, res: Response)=>{
    res.status(200).json({
        api: 'ready'
    })
});


// get all members
router.get('/members', authenticateAndAuthorizeAdmin, async(req: Request, res: Response)=>{
    const members = await Member.find().sort({createdAt: -1});
    res.json(members)
});

// get memeber
router.get('/member/:_id',authenticateUser, async(req: Request, res: Response)=>{
    const { _id } = req.params;
    try {
        const member = await Member.findById(_id);
        if (!member) {
            return res.status(404).json({ message: 'member not found' });
        }
        res.json(member);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


// delete member
router.post('/delete_member',authenticateAndAuthorizeAdmin, async(req: Request, res: Response)=>{
    const {_id} = req.body;
    try{
        await Member.findByIdAndDelete(_id);
        res.status(200).json({status: 'ok'});
    }catch(err){
        res.status(404).json({error: 'member not found!'});
    }
});

// add member
router.post('/addmember',authenticateAndAuthorizeAdmin, async (req: Request, res: Response) => {
    const { fullname, email, password, department, gender, year } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

        await Member.create({
            fullname,
            email,
            // Save the hashed password
            password: hashedPassword,
            department,
            gender,
            year,
        });
        res.status(201).json({
            status: 'ok',
        });
    } catch (error) {
        res.status(400).json({
            status: 'bad request',
        });
    }
});


// admin-login
// router.post('/admin-login', async (req: Request, res: Response) => {
//     const { username, password } = req.body;
    
//     try {
//         const admin = await Admin.findOne({ username });

//         if (!admin) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const passwordMatch = await bcrypt.compare(password, admin.password);

//         if (!passwordMatch) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ memberId: admin._id,fullname: admin.username,   role: 'admin'}, 'your_secret_key', { expiresIn: '1h' });

//         res.status(200).json({ message: 'Login successful', token });

//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// admin login using local creds
router.post('/admin-login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const _username = process.env.ADMIN;
    const _password = process.env.PASSWORD;
    try {


        if (!(username === _username && password === _password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ user: username,   role: 'admin'}, 'your_secret_key', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// login
router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    try {
        const member = await Member.findOne({ email });

        if (!member) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, member.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create a JWT token upon successful authentication
        const token = jwt.sign({ memberId: member._id,fullname: member.fullname,  email: member.email, department: member.department, role: 'user', gender: member.gender, year: member.year }, 'your_secret_key', { expiresIn: '1h' });

        // Send the token in the response after successful login
        res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


// change password
router.put('/changepassword',authenticateUser, async (req: Request, res: Response) => {
    const { _id, oldPassword, newPassword, confirmPassword } = req.body;
    console.log(_id, oldPassword, newPassword);
    try {
        const member = await Member.findById(_id);

        if(newPassword !== confirmPassword){
            return res.status(400).json({ message: 're-confirm your passowrd' });
        }

        if (!member) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(oldPassword, member.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Old password is incorrect' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        member.password = hashedNewPassword;
        await member.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


// edit member
router.post('/editmember',authenticateUserOrAdmin, async(req: Request, res: Response)=>{
    const {_id, newFullname, newEmail, newDepartment, newGender, newYear} = req.body;

    console.log(_id, newFullname, newEmail, newDepartment, newGender, newYear);

    const member = await Member.findById(_id);

    if(!member){
        return res.status(404).json({ error: 'member not found' });
    }

    try{
        member.fullname = newFullname || member.fullname;
        member.email = newEmail || member.email;
        member.department = newDepartment || member.department;
        member.gender = newGender || member.gender;
        member.year = newYear || member.year;

        await member.save();
        return res.status(200).json({
            status: 'ok'
        });
    }catch(error){
        return res.status(400).json({
            status: 'bad request'
        })
    }
});



// get all events
router.get('/events',authenticateUserOrAdmin, async(req: Request, res: Response)=>{
    const events = await Event.find().sort({createdAt: -1});
    res.json(events)
});


router.get('/events/upcoming',authenticateUserOrAdmin, async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0]; 

    const upcomingEvents = await Event.find({ date: { $gte: today } }).sort({ date: 1 });

    res.json(upcomingEvents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching upcoming events'});
  }
});

// archived events
router.get('/events/archived',authenticateUserOrAdmin, async (req: Request, res: Response) => {
  try {
    const today = new Date().toISOString().split('T')[0]; 

    const archived = await Event.find({ date: { $lte: today } }).sort({ date: 1 });
    res.json(archived);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching upcoming events'});
  }
});


// get event by id
router.get('/event/:_id',authenticateUserOrAdmin, async (req: Request, res: Response) => {
    const { _id } = req.params;
    try {
        const event = await Event.findById(_id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


// delete event
router.post('/delete_event',authenticateAndAuthorizeAdmin, async(req: Request, res: Response)=>{
    const {_id} = req.body;
    try{
        await Event.findByIdAndDelete(_id);
        res.status(200).json({status: 'ok'});
    }catch(err){
        res.status(404).json({error: 'event not found!'});
    }
});

// create event
router.post('/addevent',authenticateAndAuthorizeAdmin, uploadMiddleware.single('file'), async(req: any, res: Response)=>{
    try{
        const {originalname, path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        const {title, description, time, date} = req.body;

        const product = await Event.create({
            title,
            description,
            cover: newPath,
            time,
            date,
        });
        console.log(product);
        res.status(201).json({status: 'ok'});
    }catch(err){
        console.log(err)
        res.status(400).json({
            status: 'bad request'
        })
    }
});

// edit event this will be changed
router.post('/edit_event',authenticateAndAuthorizeAdmin, uploadMiddleware.single('file'), async(req: any, res: Response)=>{
    try{
        
        const { _id, title, description, time, date } = req.body;

        // get event
        const event = await Event.findById(_id);
        let newPath: any;

        const {originalname, path} = req.file || '';

        if(originalname && path){
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            newPath = path + '.' + ext;
            fs.renameSync(path, newPath);
        }else{
            newPath = event?.cover;
        }

        // check if the event is not available
        if (!event) {
            return res.status(404).json({ error: 'Product not found' });
        }

        //update event
        event.title = title || event.title;
        event.description = description || event.description;
        event.cover = newPath;
        event.time = time || event.time;
        event.date = date || event.date;

        // Save the updated event
        await event.save();
        return res.status(200).json({ status: 'ok' });

    }catch(err){
        console.log(err)
        res.status(400).json({
            status: 'bad request'
        })
    }
});


// get report counts
router.get('/get_counts',authenticateAndAuthorizeAdmin, async (req: Request, res: Response) => {
    const today = new Date().toISOString().split('T')[0]; 

    const allMembersCount = await Member.countDocuments();
    const allEventsCount = await Event.countDocuments();
    const upcomingCount = await Event.countDocuments({ date: { $gte: today } });
    const archivedCount = await Event.countDocuments({ date: { $lte: today } });
  
    const reports = [
    { name: 'All Member', count: allMembersCount },
    { name: 'All Events', count: allEventsCount },
    { name: 'Upcoming event', count: upcomingCount },
    { name: 'Archived event', count: archivedCount},
  ];

  res.json(reports);
});

// create message
router.post('/sendmessage', async (req: Request, res: Response) => {
    const { fullname, email, subject, message } = req.body;
    try {
        await Message.create({
            fullname,
            email,
            subject,
            message
        });
        res.status(201).json({
            status: 'ok',
        });
    } catch (error) {
        res.status(400).json({
            status: 'bad request',
        });
    }
});


// get messages
router.get('/messages',authenticateAndAuthorizeAdmin, async (req: Request, res: Response) => {
    try {
        const messages = await Message.find().sort({createdAt: -1});
        res.status(201).json(messages);

    } catch (error) {
        res.status(400).json({
            status: 'bad request',
        });
    }
});


export default router;