const initialState = {
   isAuthenticated: false,
   user: null,
};

const authenticationReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'LOGIN_SUCCESS':
         return { ...state, isAuthenticated: true, user: action.payload.user };
      case 'LOGOUT_SUCCESS':
         return initialState;
      default:
         return state;
   }
};

export default authenticationReducer;
