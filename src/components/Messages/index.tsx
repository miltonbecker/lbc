import React, { useState, useEffect, useRef } from 'react';
import { logIn, fetchMessages, addMessage } from '../../fake-api';
import { Message } from '../Message';
import { Post } from '../Post';
import uuid from 'uuid/v4';

import '../styles.css';

const GUEST_USER = 'Guest';

export function Messages() {
  const [fetching, setFetching] = useState(true);
  const [messages, setMessages] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(GUEST_USER);
  const [confidential, setConfidential] = useState(false);

  // to be able to change the textarea's value
  const textRef = useRef('');

  // executed on the first render and after logging in or out
  useEffect(() => {
    fetchMessages(loggedIn)
      .then(data => {
        setMessages(data);
        setFetching(false);
      })
      .catch(error => {
        // add an error state and show an error message
      });
  }, [loggedIn]);

  // used async/await to showcase another way of dealing with promises
  const handleLogIn = async () => {
    try {
      const userName = await logIn();

      setFetching(true);
      setLoggedIn(true);
      setLoggedInUser(userName);
    } catch (error) {
      // add an error state and show an error message
    }
  };

  const handleLogOut = () => {
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

    // optimistic approach, more responsive
    setMessages([...messages, newMessage]);

    // reset state
    setConfidential(false);
    currentTextRef.value = '';

    // finally call the api
    addMessage(newMessage);
  };

  const handleConfidentialChange = () => {
    setConfidential(!confidential);
  };

  return (
    <div className="container">
      <section className="header">
        <h1>Messages</h1>
        <button onClick={handleLogIn} disabled={loggedIn}>
          Log in
        </button>
        <button onClick={handleLogOut} disabled={!loggedIn}>
          Log out
        </button>
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
