import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AL ,SET_LOADING,SET_ERROR} from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
  name : null,
  email : null,
  didTryAutoLogin: false,
  loading  :false,
  error : null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        name: action.name,
        email: action.email,
        didTryAutoLogin: true
      };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true
      };
    case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true
      };
    case SET_LOADING:
      return {
        ...initialState,
        loading: action.loading
      };
    case SET_ERROR:
      return {
        ...initialState,
        error: action.error
      };
    default:
      return state;
  }
};
