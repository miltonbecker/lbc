import React from 'react';

export function Message(props) {
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
