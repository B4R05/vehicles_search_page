const INIT_STATE = {
  response: { metadata: { aggregations: {} }, data: [] },
  error: null,
  criteria: {
    vehicle_type: "Consumer" //thats the minimum criteria object that works
  }
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        response: action.payload,
        error: null
      };

    case "FETCH_DATA_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
