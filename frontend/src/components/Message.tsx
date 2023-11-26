import React from 'react';

type Props = {
  fullname: string;
  email: string;
  subject: string;
  message: string;
};

const Message: React.FC<Props> = ({fullname, email, subject, message}: Props) => {

  return (
    <div className='flex flex-col border-[1px] rounded-md w-full min-h-[60px] items-start justify-center p-2'>
      <h1>Name: {fullname}</h1>
      <h1>Email: {email}</h1>
      <h1>Subject: {subject}</h1>
      <h1>Message: {message}</h1>
    </div>
  );
};

export default Message;
