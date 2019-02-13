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
    //this block handles slider/range input values
    return {
      type: "EDIT_CRITERIA",
      payload: { [minName]: value.min, [maxName]: value.max }
    };
  } else if (name === "tags") {
    //tags need an array as its value for the backend
    return {
      type: "EDIT_CRITERIA",
      payload: { [name]: [value] }
    };
  } else if (!name && !minName && !maxName) {
    //handles sort dropdown values
    return {
      type: "EDIT_CRITERIA",
      payload: {
        order_by: value.order_by,
        order_direction: value.order_direction
      }
    };
  } else {
    //handles all other dropdown values
    return {
      type: "EDIT_CRITERIA",
      payload: { [name]: value }
    };
  }
};

export const populateActiveFilters = (
  name,
  value,
  minName,
  maxName
) => dispatch => {
  if (minName && maxName) {
    //this block handles slider/range input values
    //they need to be separate each
    dispatch({
      type: "POPULATE_ACTIVE_FILTERS",
      payload: { [minName]: value.min }
    });
    dispatch({
      type: "POPULATE_ACTIVE_FILTERS",
      payload: { [maxName]: value.max }
    });
  } else if (name === "tags") {
    //tags need an array as its value for the backend
    let payload = { [name]: [value] };

    dispatch({
      type: "POPULATE_ACTIVE_FILTERS",
      payload
    });
  } else {
    //handles all other dropdown values
    let payload = { [name]: value };

    dispatch({
      type: "POPULATE_ACTIVE_FILTERS",
      payload
    });
  }
};

export const removeActiveFilter = property => {
  console.log(property);

  return {
    type: "REMOVE_ACTIVE_FILTER",
    payload: property
  };
};
