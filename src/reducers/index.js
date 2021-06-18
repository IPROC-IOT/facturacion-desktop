import { parseJwt } from "../helpers/decodeJWT";

const reducer = (state , action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST': 
      const myPayload = parseJwt(action.payload.access);
      return {
        ...state,
        id: myPayload.id,
        email: myPayload.email,
        username: myPayload.username,
        first_name: myPayload.first_name,
        last_name: myPayload.last_name,
        logged: true
      }
    case 'LOGOUT_REQUEST':
      return {
        ...state,
        user: action.payload,
        logged: false
      }
    default:
      return {
        ...state
      }
  }
};

export default reducer;