export const buildQueryString = <T extends Record<string, any>>(params: T): string => {
    const queryString = Object.keys(params)
      .filter(key => params[key] !== undefined && params[key] !== null && params[key] !== '')
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(String(params[key]))}`)
      .join('&');
  
    return queryString ? `?${queryString}` : '';
  };
  