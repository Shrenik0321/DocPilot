import axios from "axios";

export const SERVER_URL = "http://localhost:5555";

export const baseAxios = axios.create({
  timeout: 50000, // timeout of 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});
