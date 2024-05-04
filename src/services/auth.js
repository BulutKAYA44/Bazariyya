import { tryCatch } from "@thalesrc/js-utils";
import http from "./http";
import { GET_USER_URL, LOGIN_URL, REFRESH_TOKEN_URL, REGISTER_URL } from "../utils/url";

export async function registerUser(payload) {
  const [error, result] = await tryCatch(http.post(REGISTER_URL, payload));
  if (error) throw error;

  return result.data;
}

export async function loginUser(payload) {
  const [error, result] = await tryCatch(http.post(LOGIN_URL, payload));
  if (error) throw error;

  return result.data;
}

export async function refreshToken(payload) {
  const [error, result] = await tryCatch(http.post(REFRESH_TOKEN_URL, payload));
  if (error) throw error;

  return result.data;
}

export async function getCustomer(payload) {
  const [error, result] = await tryCatch(http.post(GET_USER_URL, payload));
  if (error) throw error;

  return result.data;
}

