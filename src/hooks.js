import React from 'react';
import fetch from 'node-fetch';

const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = React.useState(
    // eslint-disable-next-line no-undef
    localStorage.getItem(localStorageKey) || ''
  );
  React.useEffect(() => {
    // eslint-disable-next-line no-undef
    localStorage.setItem(localStorageKey, value);
  }, [value]);
  return [value, setValue];
};
// eslint-disable-next-line no-undef
const getLocalStorage = key => localStorage.getItem(key);
// eslint-disable-next-line no-undef
const setLocalStorage = (key, value) => localStorage.setItem(key, value);
// eslint-disable-next-line no-undef
const deleteLocalStorage = key => localStorage.removeItem(key);

const now = () => {
  const d = new Date();
  return d.toISOString();
};

const since = date => {
  const n = Date.now();
  return n - date;
};

const epochToSeconds = s => Math.round(s / 1000);

const fetchJson = async (url, options) => {
  const response = await fetch(url, options);
  return response.json();
};

export {
  useStateWithLocalStorage,
  getLocalStorage,
  setLocalStorage,
  deleteLocalStorage,
  since,
  epochToSeconds,
  now,
  fetchJson
};
