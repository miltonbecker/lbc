import React from 'react';

export function Post(props) {
  const { textRef, handlePost, confidential, handleConfidentialChange, loggedIn } = props;
  return (
    <div className="post">
      <h2>Add message</h2>
      <form className="form" onSubmit={handlePost}>
        <textarea ref={textRef} rows="6" cols="50" />
        {loggedIn && (
          <label className="checkbox">
            <input type="checkbox" checked={confidential} onChange={handleConfidentialChange} />{' '}
            Confidential
          </label>
        )}
        <button>Post</button>
      </form>
    </div>
  );
}
