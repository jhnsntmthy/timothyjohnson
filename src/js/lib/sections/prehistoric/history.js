import { Stream, never, defaultScheduler, PropagateTask } from 'most';
import { HoldSubjectSource } from 'most-subject';
import { BrowserSource } from './BrowserSource';
import { ServerSource } from './ServerSource';
export default function createHistory() {
    var holdSource = new HoldSubjectSource(never().source, 1);
    var inBrowser = currentlyInBrowser();
    var historySource = inBrowser ? new BrowserSource() : new ServerSource();
    if (inBrowser) {
        window.addEventListener('popstate', function (ev) {
            ev.preventDefault();
            event(historySource.getCurrentLocation());
        });
    }
    var history = new Stream(holdSource).startWith(historySource.go(0));
    function event(location) {
        defaultScheduler.asap(PropagateTask.event(location, holdSource));
    }
    function push(path, state) {
        if (state === void 0) { state = {}; }
        event(historySource.push(path, state));
    }
    function replace(path, state) {
        if (state === void 0) { state = {}; }
        event(historySource.replace(path, state));
    }
    function go(amount) {
        if (inBrowser)
            return historySource.go(amount);
        event(historySource.go(amount));
    }
    return { push: push, replace: replace, go: go, history: history };
}
function currentlyInBrowser() {
    try {
        return window && window.history;
    }
    catch (e) {
        return false;
    }
}
//# sourceMappingURL=history.js.map
