import React, { useState, useEffect, useRef } from 'react';
import { logIn, fetchMessages, addMessage } from './data';
import { Message } from './message';
import { Post } from './post';
import uuid from 'uuid/v4';

import './styles.css';

const GUEST_USER = 'Guest';

export function Messages() {
  const [fetching, setFetching] = useState(true);
  const [messages, setMessages] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(GUEST_USER);
  const [confidential, setConfidential] = useState(false);

  // to be able to change the textarea's value
  const textRef = useRef('');

  useEffect(() => {
    const data = fetchMessages(loggedIn);
    setMessages(data);
    setFetching(false);
  }, [loggedIn]);

  const handleLogIn = () => {
    // don't do anything if the state won't change
    if (loggedIn) return;

    const userName = logIn();

    setFetching(true);
    setLoggedIn(true);
    setLoggedInUser(userName);
  };

  const handleLogOut = () => {
    // don't do anything if the state won't change
    if (!loggedIn) return;

    setFetching(true);
    setLoggedIn(false);
    setLoggedInUser(GUEST_USER);
  };

  const handlePost = event => {
    event.preventDefault();

    const currentTextRef = textRef.current;

    // do not post empty messages
    if (currentTextRef.value.trim() === '') return;

    const newMessage = {
      id: uuid(),
      author: loggedInUser,
      text: currentTextRef.value,
      confidential,
    };
    setMessages([...messages, newMessage]);
    setConfidential(false);
    currentTextRef.value = '';

    addMessage(newMessage);
  };

  const handleConfidentialChange = () => {
    setConfidential(!confidential);
  };

  return (
    <div className="container">
      <section className="header">
        <h1>Messages</h1>
        <button onClick={handleLogIn}>Log in</button>
        <button onClick={handleLogOut}>Log out</button>
      </section>

      <Post
        textRef={textRef}
        loggedIn={loggedIn}
        confidential={confidential}
        handleConfidentialChange={handleConfidentialChange}
        handlePost={handlePost}
      />

      {fetching && <p>Fetching messages...</p>}

      {!fetching && !messages.length && <p>There are no messages.</p>}

      {!fetching && messages.length > 0 && (
        <div className="messagesContainer">
          {messages.map(message => (
            <Message key={message.id} message={message} />
          ))}
        </div>
      )}
    </div>
  );
}
