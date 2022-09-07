import axios from "axios";
import store from "../store";
import { useEffect, useState } from "react";
import jobsReducer from "../reducers/jobsReducer";
import { useSelector } from "react-redux";

const getManualAuthHeaders = () => {
  const headers = new Headers();
  headers.append("Accept", "application/json");
  headers.append(
    "Authorization",
    `Bearer ${store.getState().client.user.data.access_token}`
  );

  return headers;
};

// GET JOBS OFFERS

export const apiGetJobsOffers = () => {
  axios
    .get("https://localhost:7262/jobsEn")
    .then((res) => res.json())
    .then((data) => ({ data }))
    .catch((error) => ({
      error,
    }));
};

// END

export const apiManualRequest = (
  url = "https://localhost:7262/jobsEn",
  method = "GET"
) => {
  const headers = getManualAuthHeaders();
  const options = {
    method,
    headers,
  };
  return fetch(url, options)
    .then((res) => res.json())
    .then((data) => ({ data }))
    .catch((error) => ({ error }));
};

export const apiManualPost = (
  url = "https://localhost:7262/jobsEn",
  body,
  method = "POST"
) => {
  const headers = getManualAuthHeaders();
  headers.append("Content-Type", "application/json");

  const options = {
    method,
    headers,
    body,
  };

  return fetch(url, options)
    .then((res) => res.json())
    .then((data) => ({ data }))
    .catch((error) => ({ error }));
};

export const apiManualPatch = (
  url = "https://localhost:7262/",
  body,
  method = "PATCH"
) => {
  const headers = getManualAuthHeaders();
  headers.append("Content-Type", "application/json");

  const options = {
    method,
    headers,
    body,
  };

  return fetch(url, options)
    .then((res) => res.json())
    .then((data) => ({ data }))
    .catch((error) => ({ error }));
};

export const apiManualDelete = (
  url = "https://localhost:7262/jobsEn",
  body,
  method = "DELETE"
) => {
  const headers = getManualAuthHeaders();
  headers.append("Content-Type", "application/json");

  const options = {
    method,
    headers,
    body,
  };

  return fetch(url, options)
    .then((res) => res.json())
    .then((data) => ({ data }))
    .catch((error) => ({ error }));
};

export const registerPost = (url, body, method = "POST") => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const options = {
    method,
    headers,
    body,
  };
  return fetch(url, options)
    .then((res) => res.json())
    .then((data) => ({ data }))
    .catch((error) => ({ error }));
};

export const loginPost = (url, body, method = "POST") => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const options = {
    method,
    headers,
    body,
  };
  return fetch(url, options)
    .then((res) => res.json())
    .then((data) => ({ data }))
    .catch((error) => ({ error }));
};
/* export const apiOpenRequest = (url, body, method = "GET") => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const options = {
    method,
    headers,
    body
  };
  return fetch(url, options)
    .then(res => res.json())
    .then(data => ({ data }))
    .catch(error => ({ error }));
}; */

export const apiOpenRequest = (url, method = "GET") => {
  const headers = new Headers();
  const options = {
    method,
    headers,
  };
  return fetch(url, options)
    .then((res) => res.json())
    .then((data) => ({ data }))
    .catch((error) => ({ error }));
};

export const apiOpenPost = (
  url = "https://localhost:7262/jobsEn",
  body,
  method = "POST"
) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const options = {
    method,
    headers,
    body,
  };

  return fetch(url, options)
    .then((res) => res.json())
    .then((data) => ({ data }))
    .catch((error) => ({ error }));
};
