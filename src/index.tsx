import React from 'react';
import { render } from 'react-dom';
import { Messages } from './components/Messages';

const mainDiv = document.createElement('div');
document.body.append(mainDiv);

render(<Messages />, mainDiv);
