import DelStatusActionTypes from "./delStatus-type";

const INITIAL_STATE = {
  del_status: true,
};

const delStatusReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DelStatusActionTypes.DEL_STATUS:
      return {
        del_status: !state.del_status,
      };

    default:
      return state;
  }
};

export default delStatusReducer;
