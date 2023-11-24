import express from 'express';
import routes from './routes/routes';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(express.json());

const corsOptions = {
    credentials: true,
    methods: 'GET,PUT,POST,DELETE',
    origin: ['http://localhost:3000']
};

app.use(cors(corsOptions));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api', routes);
const port = 9000;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});