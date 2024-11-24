const validHandler = (token: string, options?: RequestInit) => ({
  ...(options ? options : {}),
  headers: {
    ...options?.headers,
    Authorization: `Bearer ${token}`
  }
});

export const getAuthRequestMetaData = async (options?: RequestInit, providedToken?: string) => {
  const token = providedToken ;
  if (!token) {
    console.log('not logged in');
    if (typeof window !== 'undefined') {
      location.href = location.href;
    }
    return Promise.reject('logout');
  }

  return validHandler(token, options);
};
