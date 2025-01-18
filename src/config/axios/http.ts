import axios from "axios";
import { GITHUB_BASE_URL, PERSONAL_ACCESS_TOKEN } from "../consts";

export const http = axios.create({
  baseURL: GITHUB_BASE_URL,
  headers: {
    Authorization: `token ${PERSONAL_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
});
