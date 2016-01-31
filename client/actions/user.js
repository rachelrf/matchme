export const FETCH_CHATS = 'FETCH_CHATS';
export const SET_CHATS = 'SET_CHATS';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SET_USER_SCORE = 'SET_USER_SCORE';
export const FETCH_USER_SCORE = 'FETCH_USER_SCORE';

function setChats(chats) {
  return {
    type: SET_CHATS,
    chats: chats
  };
}

export function fetchChats(user_id) {
  return function(dispatch) {
    let request = new Request(`/api/chats/${user_id}`, {method: 'GET'});
    return fetch(request)
      .then(response => response.json())
      .then(json => dispatch(setChats(json)));
  };
}

export function sendMessage(text, sender, pair_id) {
  return function(dispatch) {
    let request = new Request('/api/chats', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sender: sender,
        pair_id: pair_id,
        text: text //note: created_at is calculated on the server before db insert
      })
    });

    return fetch(request)
      .then(() => {
        dispatch(fetchChats(sender));
      });
  };
}

export function fetchUserScore (user_id) {
  return function (dispatch) {
    let request = new Request(`/api/matchmakerScore/${user_id}`, {method: 'GET'});
    return fetch(request)
      .then(response => response.json())
      .then(json => dispatch(setUserScore(json)));
  };
}

export function setUserScore (userScore) {
  return {
    type: SET_USER_SCORE,
    userScore: userScore
  };
}
