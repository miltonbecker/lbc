import apiResponse from '../messages.json';

let data = apiResponse.data;

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
