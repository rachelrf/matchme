export const SET_USER_SCORE = 'SET_USER_SCORE';
export const FETCH_USER_SCORE = 'FETCH_USER_SCORE';
export const SET_USER_INFO = 'SET_USER_INFO';
export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO';


export function fetchUserScore (user_id) {
  console.log('fetching user score');
  return function (dispatch) {
    let request = new Request(`/api/matchmakerScore/${user_id}`, {method: 'GET'});
    return fetch(request)
      .then(response => response.json())
      .then(json => dispatch(setUserScore(json)));
  };
}

export function setUserScore (userScore) {
  console.log('the user score is', userScore);
  return {
    type: SET_USER_SCORE,
    userScore: userScore
  };
}

export const updateUserInfo = (userID, userInfo) => {
  return dispatch => {
    dispatch(setUserInfo(userInfo));
    // let request = new Request(`/api/users/${userID}`, {
    //   method: 'put',
    //   headers: { 'Accept': 'application/json','Content-Type': 'application/json'},
    //   body: JSON.stringify(userInfo)
    // });
    // return fetch(request)
    //   .then(response => response.json())
    //   .then(json => dispatch(receiveUserInfo(json)));
  };
}

export function setUserInfo(userInfo){
  return {
    type: SET_USER_INFO,
    userInfo
  };
}

export function receiveUserInfo(userInfo){
  return {
    type: RECEIVE_USER_INFO,
    userInfo
  };
}