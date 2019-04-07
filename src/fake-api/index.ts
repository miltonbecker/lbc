import apiResponse from './db.json';

type Message = {
  id: string;
  author: string;
  text: string;
  confidential: boolean;
};

let data: Message[] = apiResponse.data;

export async function logIn(/* credentials would go here */) {
  return apiResponse.userName;
}

export async function fetchMessages(loggedIn: boolean = false) {
  if (loggedIn) return data;

  return data.filter(message => !message.confidential);
}

export async function addMessage(message: Message) {
  data = [...data, message];
}
