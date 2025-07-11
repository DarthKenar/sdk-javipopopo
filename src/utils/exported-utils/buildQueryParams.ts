interface BuildQueryParamsOptions {
  includeEmptyString?: boolean;
  includeZero?: boolean;
  includeNull?: boolean;
  includeUndefined?: boolean;
  includeFalse?: boolean;
}

export function buildQueryParams<T extends Record<string, unknown>>(
  params: T,
  options: BuildQueryParamsOptions = {}
): string {
  const {
    includeEmptyString = false,
    includeZero = false,
    includeNull = false,
    includeUndefined = false,
    includeFalse = false,
  } = options;

  const filteredEntries = Object.entries(params).filter(([_, value]) => {
    if (value === "") return includeEmptyString;
    if (value === 0) return includeZero;
    if (value === null) return includeNull;
    if (value === undefined) return includeUndefined;
    if (value === false) return includeFalse;
    return value !== undefined && value !== null;
  });

  if (filteredEntries.length === 0) return "";

  const queryString = filteredEntries
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value
          .map(
            (item) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`
          )
          .join("&");
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
    })
    .join("&");

  return queryString ? `?${queryString}` : "";
}
