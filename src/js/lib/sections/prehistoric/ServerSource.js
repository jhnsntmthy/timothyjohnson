var initialLocation = {
    path: '/',
    hash: '',
    state: {},
    queries: {},
};
var ServerSource = (function () {
    function ServerSource() {
        this.locations = [initialLocation];
        this.position = 0;
    }
    ServerSource.prototype.push = function (path, state) {
        if (state === void 0) { state = {}; }
        ++this.position;
        var location = createLocation(path, state);
        this.locations[this.position] = location;
        return location;
    };
    ServerSource.prototype.replace = function (path, state) {
        if (state === void 0) { state = {}; }
        var location = createLocation(path, state);
        this.locations[this.position] = location;
        return location;
    };
    ServerSource.prototype.go = function (amount) {
        var count = this.locations.length;
        var position = this.position;
        var newPosition = position + amount;
        if (newPosition >= count)
            this.position = count - 1;
        else if (newPosition < 0)
            this.position = 0;
        else
            this.position = newPosition;
        return this.locations[this.position];
    };
    ServerSource.prototype.getCurrentLocation = function () {
        return this.locations[this.position];
    };
    return ServerSource;
}());
export { ServerSource };
function createLocation(path, state) {
    return {
        path: path,
        state: state,
        hash: '',
        queries: {},
    };
}
//# sourceMappingURL=ServerSource.js.map