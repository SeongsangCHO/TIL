import {REGISTER_DATA, REGISTER_SUCCESS, REGISTER_FAIL} from '../actions/registerAction';

const initialState = {
  data:{
    user_id: "",
    user_password: '',
  }
};

//상태가 변화할 때 수행되는 함수
//Type에 따른 상태변화
const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_DATA:
      return {...state};
    case REGISTER_SUCCESS:
      return { ...state, data: {...action.payload} };
    case  REGISTER_FAIL :
      return {...state, data: {}};
    default:
      return state;
  }
};
export default registerReducer;