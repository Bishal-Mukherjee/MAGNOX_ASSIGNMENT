import axios from "axios";
import { SERVER_URL } from "../constants";

export const register = async ({ name, email, password }) => {
  const response = await axios({
    headers: { "Content-Type": "application/json" },
    url: `${SERVER_URL}/api/user/register`,
    method: "POST",
    data: JSON.stringify({ name, email, password }),
  });
  return response.data;
};

export const login = async ({ email, password }) => {
  const response = await axios({
    headers: { "Content-Type": "application/json" },
    url: `${SERVER_URL}/api/user/login`,
    method: "POST",
    data: JSON.stringify({ email, password }),
  });
  return response.data;
};
