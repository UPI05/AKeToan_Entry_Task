const API_DOMAIN = {
  dev: process.env.DEV_ENV,
  test: process.env.DEV_TEST,
  prod: process.env.DEV_PROD,
};

/**
 * Util to get the full API URL base on ENV
 * @param {string} url
 * @param {string} env
 */

export const getFullApiUrl = (url, env = process.env.REACT_APP_API_KEY || 'dev') => {
  if (!url) return '';
  if (!Object.keys(API_DOMAIN).includes(env.toLowerCase())) return url;

  // For localhost, using proxy from webpack
  if (env.toLowerCase() === 'dev') {
    return url;
  }

  return `${API_DOMAIN[env.toLowerCase()]}${url}`;
};

/**
 * Util to check if the given url is absolute
 * @param {string} url
 */
export const isAbsoluteURL = url => {
  try {
    const urlObj = new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Util to check if given url is valid url (ends with "domain.xyz")
 * @param {string} url
 */
export const isURLValid = url => {
  try {
    const urlObj = new URL(url);
    return !!urlObj.origin && !!urlObj.origin.endsWith(process.env.DOMAIN);
  } catch {
    return false;
  }
};

/**
 * Util to inject path params into route
 * Ex: makeUrl('/api/:id/a', { id: "new" }) return '/api/new/a'
 * @param {string} route
 * @param {object} options
 */
export const makeUrl = (route, options) => {
  if (typeof options !== 'object') return route;
  let formattedRoute = route;
  Object.keys(options).forEach(key => {
    formattedRoute = formattedRoute.replace(`:${key}`, encodeURIComponent(options[key]));
  });
  return formattedRoute;
};

/**
 * Parse a query string into object
 * @param {*} query
 */
export const parseUrlQuery = query => {
  if (!query || !query.startsWith('?')) {
    return {};
  }

  const res = {};
  query
    .slice(1)
    .split('&')
    .forEach(q => {
      if (!q || !q.includes('=')) return;

      const [key, val] = q.split('=');
      res[key] = decodeURIComponent(val);
    });

  return res;
};

/**
 * Convert object to query string
 * @param {obj} obj
 */
export const objectToUrlQuery = obj => {
  if (!obj || typeof obj !== 'object' || Object.keys(obj).length === 0) {
    return '';
  }

  let query = '?';
  Object.keys(obj).forEach((k, idx) => {
    if (obj[k] !== undefined) {
      query += `${idx !== 0 ? '&' : ''}${k}=${encodeURIComponent(obj[k])}`;
    }
  });

  return query;
};
