import apiResponse from '../messages.json';

type Message = {
  id: string;
  author: string;
  text: string;
  confidential: boolean;
};

let data: Message[] = apiResponse.data;

export function logIn(/* credentials would go here */) {
  return apiResponse.userName;
}

export function fetchMessages(loggedIn = false) {
  if (loggedIn) return data;

  return data.filter(message => !message.confidential);
}

export function addMessage(message) {
  data = [...data, message];
}
