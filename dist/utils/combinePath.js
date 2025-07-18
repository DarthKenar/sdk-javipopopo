export function combineUrl(baseUrl, requestUrl) {
    const cleanedUrlPath = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const cleanedRequestUrl = requestUrl.startsWith('/') ? requestUrl.slice(1) : requestUrl;
    if (cleanedRequestUrl) {
        return `${cleanedUrlPath}/${cleanedRequestUrl}`;
    }
    return cleanedUrlPath;
}
