import axios from "axios";

export const API = (opts = {}, optsHeader = {}) => {
  /*
  |--------------------------------------------------
  | Custom axios api
  |--------------------------------------------------
  */
  const auth_token = localStorage.getItem("auth_token");
  const defaultOptions = {
    ...opts,
    headers: {
      'auth_token': auth_token ? auth_token : "",
      ...optsHeader,
    },
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  };

  let baseURL = process.env.REACT_APP_SERVER_URL + '/api/';
  const axiosApi = axios.create({
    baseURL,
    ...defaultOptions,
  });

  axiosApi.interceptors.response.use((response) => {
    return response;
  }, (error: any) => {
    if (error.response.status === 403) {
      localStorage.removeItem("auth_token");
    }
    return Promise.reject(error.response);
  });

  return axiosApi;
};
