export function objectToQueryString(obj: any, prependQuestion: boolean = true) {
  return obj
    ? `${prependQuestion ? "?" : ""}${Object.keys(obj)
        .map(function (key) {
          if (typeof obj[key] === "boolean") {
            return (
              encodeURIComponent(key) +
              "=" +
              encodeURIComponent(obj[key].toString())
            );
          }
          if (obj[key]) {
            return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
          }
          return "";
        })
        .filter(Boolean)
        .join("&")}`
    : "";
}
