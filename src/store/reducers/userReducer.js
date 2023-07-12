import { LOGIN, LOGOUT } from "../actions/index";

const initialState = {
  isLoggedIn: false,
  userRole: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        userRole: action.payload.role,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userRole: "",
      };
    default:
      return state;
  }
};

export default userReducer;
