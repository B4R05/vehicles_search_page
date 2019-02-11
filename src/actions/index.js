import api from "../api/api";

export const fetchData = type => (dispatch, getState) => {
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
