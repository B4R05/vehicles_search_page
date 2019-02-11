import axios from "axios";

export default axios.create({
  baseURL: `https://app.joindrover.com/api/web`,
  headers: {
    "Content-Type": "application/json",
    Authorization: ""
  }
});
