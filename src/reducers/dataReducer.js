import { defaultCriteria } from "../config/minimumCriteria";

const INIT_STATE = {
  response: { metadata: { aggregations: {} }, data: [] },
  error: null,
  isVehiclesLoading: true,
  criteria: defaultCriteria,
  isCriteriaPristine: true
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case "FETCHING_DATA":
      return { ...state, isVehiclesLoading: true };

    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        response: action.payload,
        error: null,
        isVehiclesLoading: false
      };

    case "FETCH_DATA_ERROR":
      return { ...state, error: action.payload, isVehiclesLoading: false };

    case "EDIT_CRITERIA":
      //revert back to page: 1
      if (!action.payload.hasOwnProperty("page")) {
        return {
          ...state,
          criteria: sanitizeCriteria({
            ...state.criteria,
            ...action.payload,
            page: 1
          }),
          isCriteriaPristine: false
        };
      } else {
        return {
          ...state,
          criteria: sanitizeCriteria({
            ...state.criteria,
            ...action.payload
          }),
          isCriteriaPristine: false
        };
      }

    case "RESET_CRITERIA":
      return {
        ...state,
        criteria: sanitizeCriteria({
          ...action.payload
        }),
        isCriteriaPristine: true
      };

    default:
      return state;
  }
};

const sanitizeCriteria = obj => {
  //this function removes all keys with value "" or 0 from the criteria object
  // this is important because if you send year: 0 as criteria, you will get an empty match from backend
  const o = JSON.parse(JSON.stringify(obj)); // Clone source object.

  Object.keys(o).forEach(key => {
    if (o[key] && typeof o[key] === "object") {
      o[key] = sanitizeCriteria(o[key]);
    }
    // Recurse.
    else if (o[key] === undefined || o[key] === "" || o[key] === 0) {
      delete o[key];
      // Delete undefined and null.
    } else {
      // eslint-disable-next-line
      o[key] = o[key]; // Copy value.
    }
  });
  return o; // Return new object.
};
