const removeInvalidValues = obj => {
  //this function removes all keys with value "" or 0 from the criteria object
  // this is important because if you send year: 0 as criteria, you will get an empty match from backend

  //this function removes all keys with value "" or 0 from the input object
  //and returns a new object without the empty valued keys

  //WHY?: this is important because if you send year: 0 as criteria, you will get an empty match from backend
  const o = JSON.parse(JSON.stringify(obj)); // Clone source object.

  Object.keys(o).forEach(key => {
    if (o[key] && typeof o[key] === "object") {
      o[key] = removeInvalidValues(o[key]);
    }
    // Recurse.
    else if (o[key] === undefined || o[key] === "" || o[key] === 0) {
      delete o[key];
      // Delete undefined and null.
    } else {
      o[key] = o[key]; // Copy value.
    }
  });
  return o; // Return new object.
};

const INIT_STATE = {
  response: { metadata: { aggregations: {} }, data: [] },
  error: null,
  isVehiclesLoading: true,
  activeFilters: [],
  criteria: removeInvalidValues({
    // this is the object we initially send to the server at runtime
    page: 1,
    vehicle_type: "PCO", //thats the minimum criteria object key that works
    vehicle_make: "",
    vehicle_model_group: "",
    transmission: "",
    fuel: "",
    number_of_seats_max: 9,
    number_of_seats_min: 2,
    price_max: 1800,
    price_min: 100,
    number_of_months: 2,
    subscription_start_days: 30,
    order_by: "recommended",
    order_direction: "asc",
    location: "London, UK",
    max_distance: 1000,
    year: 0
  })
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

    case "POPULATE_ACTIVE_FILTERS":
      //is action.payload object present in state.activeFilters ? if so edit its values
      //if not add that action.payload object in state.activeFilters
      let foundActiveFilter = state.activeFilters.find(
        obj => Object.keys(obj)[0] === Object.keys(action.payload)[0]
      );

      if (foundActiveFilter !== undefined) {
        //if foundactivefilter present in state.activeFilters...
        let arrayMinusFoundActiveFilter = state.activeFilters.filter(
          obj => obj !== foundActiveFilter
        );

        //make sure no emptty strings in action.payload value
        if (Object.values(action.payload)[0] === "") {
          return {
            ...state,
            activeFilters: [...arrayMinusFoundActiveFilter]
          };
        } else {
          return {
            ...state,
            activeFilters: [...arrayMinusFoundActiveFilter, action.payload]
          };
        }
      } else {
        //if foundactivefilter not found in state.activeFilters, add the payload
        return {
          ...state,
          activeFilters: [...state.activeFilters, action.payload]
        };
      }

    case "REMOVE_ACTIVE_FILTER":
      if (action.payload !== "") {
        let foundActiveFilter = state.activeFilters.find(obj => {
          return Object.values(obj)[0] === action.payload;
        });

        let arrayMinusFoundActiveFilter = state.activeFilters.filter(
          obj => obj !== foundActiveFilter
        );

        return {
          ...state,
          activeFilters: [...arrayMinusFoundActiveFilter]
        };
      } else {
        return {
          ...state,
          activeFilters: []
        };
      }

    //if index of object given through action creator then...
    //find the activeFilters array
    //find the index of the object to remove / the object itself
    //remove it
    //return an array without that object
    //
    //if index of object not provided...
    //clear the entire array

    case "EDIT_CRITERIA":
      return {
        ...state,
        criteria: removeInvalidValues({
          ...state.criteria,
          ...action.payload
        })
      };

    default:
      return state;
  }
};
