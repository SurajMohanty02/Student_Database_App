import { MdSignalCellularNull } from "react-icons/md";

export const initialState = {
  data: null,
  status: null,
};
export const actionTypes = {
  SELECTEDDATA: "SELECTEDDATA",
  OPEN: "OPEN",
  CLOSE: "CLOSE",
  STATUS: "STATUS",
};
const DataReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SELECTEDDATA:
      return {
        ...state,
        data: action.data,
      };
    case actionTypes.STATUS:
      return {
        status: action.status,
      };
    default:
      return state;
  }
};
export default DataReducer;
