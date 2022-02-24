import axios from 'axios';
import { getFullApiUrl, isAbsoluteURL } from './url';

export const get = async (url, headers = {}, withCredentials = true) => {
  try {
    const finalUrl = isAbsoluteURL(url) ? url : getFullApiUrl(url);
    const { data } = await axios.get(finalUrl, {
      headers: {
        ...headers,
      },
      withCredentials,
    });
    return { data };
  } catch (err) {
    return { error: -1, data: null };
  }
};

export const post = async (url, body, headers = {}) => {
  try {
    const finalUrl = isAbsoluteURL(url) ? url : getFullApiUrl(url);
    const { data } = await axios.post(finalUrl, body, {
      headers: {
        ...headers,
      },
      withCredentials: true,
    });
    return { data };
  } catch (err) {
    return { error: -1, data: null };
  }
};

export const Delete = async (url, headers = {}) => {
  try {
    const finalUrl = isAbsoluteURL(url) ? url : getFullApiUrl(url);
    const { data } = await axios.delete(finalUrl, {
      headers: {
        ...headers,
      },
      withCredentials: true,
    });
    return { data };
  } catch (err) {
    return { error: -1, data: null };
  }
};

export const update = async (url, body, headers = {}) => {
  try {
    const finalUrl = isAbsoluteURL(url) ? url : getFullApiUrl(url);
    const { data } = await axios.put(finalUrl, body, {
      headers: {
        ...headers,
      },
      withCredentials: true,
    });
    return { data };
  } catch (err) {
    return { error: -1, data: null };
  }
};
