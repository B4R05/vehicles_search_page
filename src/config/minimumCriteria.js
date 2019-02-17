export const defaultCriteria = {
  vehicle_type: "Consumer", //thats the minimum criteria object key that works
  order_by: "recommended",
  order_direction: "asc",
  location: "London, UK",
  max_distance: 1000,
  subscription_start_days: 30
};

export const defaultCriteriaPCO = {
  page: 1,
  vehicle_type: "PCO",
  location: "London, UK",
  max_distance: 1000,
  subscription_start_days: 21
};
