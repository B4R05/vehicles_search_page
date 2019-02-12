import api from "../api/api";

//redux-thunk feeds the action creator with
//dispatch AND getState as second argument.
export const fetchData = type => (dispatch, getState) => {
  //for loading spinner later
  dispatch({
    type: "FETCHING_DATA"
  });

  console.log("Making request with criteria: ", getState().data.criteria);

  api
    .post("/vehicles", getState().data.criteria)
    .then(response => {
      dispatch({
        type: "FETCH_DATA_SUCCESS",
        payload: response.data
      });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({
        type: "FETCH_DATA_ERROR",
        payload: err
      });
    });
};

export const editCriteria = (name, value, minName, maxName) => {
  if (minName && maxName) {
    return {
      type: "EDIT_CRITERIA",
      payload: { [minName]: value.min, [maxName]: value.max }
    };
  } else if (name === "tags") {
    return {
      type: "EDIT_CRITERIA",
      payload: { [name]: [value] }
    };
  } else if (!name && !minName && !maxName) {
    return {
      type: "EDIT_CRITERIA",
      payload: {
        order_by: value.order_by,
        order_direction: value.order_direction
      }
    };
  } else {
    return {
      type: "EDIT_CRITERIA",
      payload: { [name]: value }
    };
  }
};
