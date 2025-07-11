const validHandler = (token, options) => (Object.assign(Object.assign({}, (options ? options : {})), { headers: Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.headers), { Authorization: `Bearer ${token}` }) }));
export const getAuthRequestMetaData = async (options, providedToken) => {
    const token = providedToken;
    if (!token) {
        console.log('not logged in');
        if (typeof window !== 'undefined') {
            location.href = location.href;
        }
        return Promise.reject('logout');
    }
    return validHandler(token, options);
};
