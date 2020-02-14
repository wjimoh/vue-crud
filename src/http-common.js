import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:8080/api",
  baseURL: "http://etestapi.test.eminenttechnology.com/api",
  headers: {
    "Content-type": "application/json"
  }
});