/* eslint-env browser */
var BrowserSource = (function () {
    function BrowserSource() {
    }
    BrowserSource.prototype.push = function (path, state) {
        if (state === void 0) { state = {}; }
        window.history.pushState(state, createKey(), path);
        return getCurrentLocation();
    };
    BrowserSource.prototype.replace = function (path, state) {
        if (state === void 0) { state = {}; }
        window.history.replaceState(state, createKey(), path);
        return getCurrentLocation();
    };
    BrowserSource.prototype.go = function (amount) {
        if (amount !== 0)
            window.history.go(amount);
        return getCurrentLocation();
    };
    BrowserSource.prototype.getCurrentLocation = function () {
        return getCurrentLocation();
    };
    return BrowserSource;
}());
export { BrowserSource };
function getCurrentLocation() {
    return {
        path: location.pathname,
        state: history.state,
        hash: location.hash,
        queries: parseQueryString(location.search),
    };
}
function createKey() {
    return Math.random().toString(36).substr(2, 6);
}
function parseQueryString(queryString) {
    var queryStrings = queryString.substring(1).split('&');
    return queryStrings
        .reduce(function (queries, query) {
        var _a = query.split('='), queryName = _a[0], queryValue = _a[1];
        queries[queryName] = queryValue;
        return queries;
    }, {});
}
//# sourceMappingURL=BrowserSource.js.map
