var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const validHandler = (token, options) => (Object.assign(Object.assign({}, (options ? options : {})), { headers: Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.headers), { Authorization: `Bearer ${token}` }) }));
export const getAuthRequestMetaData = (options, providedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const token = providedToken;
    if (!token) {
        console.log('not logged in');
        if (typeof window !== 'undefined') {
            location.href = location.href;
        }
        return Promise.reject('logout');
    }
    return validHandler(token, options);
});
