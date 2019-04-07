import React from 'react';

type MessageProps = {
  key: any;
  message: {
    id: string;
    author: string;
    text: string;
    confidential: boolean;
  }
}

export function Message(props: MessageProps) {
  const { message } = props;
  const { author, text, confidential } = message;
  const messageStyle = confidential ? 'message confidential' : 'message';

  return (
    <div className={messageStyle}>
      <p className="author">{author}</p>
      <p>{text}</p>
    </div>
  );
}
