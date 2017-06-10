import BezierEasing from "bezier-easing";
import _ from "../util/helpers";

const easings = {
  ease: [0.25, 0.1, 0.25, 1.0],
  linear: [0.00, 0.0, 1.00, 1.0],
  "ease-in": [0.42, 0.0, 1.00, 1.0],
  "ease-out": [0.00, 0.0, 0.58, 1.0],
  "ease-in-out": [0.42, 0.0, 0.58, 1.0]
}

const abortEvents = [
    "mousedown",
    "wheel",
    "DOMMouseScroll",
    "mousewheel",
    "keyup",
    "touchmove"
];

let defaults = {
    container: "body",
    duration: 500,
    easing: "ease",
    offset: 0,
    onDone: false,
    onCancel: false
};

// export function setDefaults(options) {
//     defaults = Object.assign({}, defaults, options);
// }
//
const scroller = () => {
    let element; // element to scroll to
    let container; // container to scroll
    let duration; // duration of the scrolling
    let easing; // easing to be used when scrolling
    let offset; // offset to be added (subtracted)
    let onDone; // callback when scrolling is done
    let onCancel; // callback when scrolling is canceled / aborted

    let initialY; // initial Y of container
    let targetY; // target Y of container
    let diff; // difference

    let abort; // is scrolling aborted

    // let abortEv; // event that aborted scrolling
    // let abortFn = e => {
    //     abortEv = e;
    //     abort = true;
    // };
    let easingFn;

    let timeStart; // time when scrolling started
    let timeElapsed; // time elapsed since scrolling started

    let progress; // progress

    function scrollTop(container) {
        let scrollTop = container.scrollTop;

        if (container.tagName.toLowerCase() === "body") {
            // in firefox body.scrollTop always returns 0
            // thus if we are trying to get scrollTop on a body tag
            // we need to get it from the documentElement
            scrollTop = scrollTop || document.documentElement.scrollTop;
        }

        return scrollTop;
    }

    function step(timestamp) {
        // if (abort) return done();
        if (!timeStart) timeStart = timestamp;

        timeElapsed = timestamp - timeStart;

        progress = Math.min(timeElapsed / duration, 1);
        progress = easingFn(progress);

        top(container, initialY + diff * progress);

        timeElapsed < duration ? window.requestAnimationFrame(step) : done();
    }

    function done() {
        if (!abort) top(container, targetY);
        timeStart = false;

        // _.off(container, abortEvents, abortFn);
        // if (abort && onCancel) onCancel(abortEv);
        if (!abort && onDone) onDone();
    }

    function top(element, top) {
        element.scrollTop = top;
        if (element.tagName.toLowerCase() === "body") {
            // in firefox body.scrollTop doesn't scroll the page
            // thus if we are trying to scrollTop on a body tag
            // we need to scroll on the documentElement
            document.documentElement.scrollTop = top;
        }
    }

    function scrollTo(target, _duration, options = {}, cb) {
        if (typeof _duration === "object") {
            options = _duration;
        } else if (typeof _duration === "number") {
            options.duration = _duration;
        }

        element = _.$(target);

        if (!element) {
            return console.warn(
                "[vue-scrollto warn]: Trying to scroll to an element that is not on the page: " +
                    target
            );
        }

        container = _.$(options.container || defaults.container);
        duration = options.duration || defaults.duration;
        easing = options.easing || defaults.easing;
        offset = options.offset || defaults.offset;
        // onDone = options.onDone || defaults.onDone;
        onCancel = options.onCancel || defaults.onCancel;

        onDone = cb

        initialY = scrollTop(container);
        targetY = _.cumulativeOffset(element).top -
            container.offsetTop +
            offset;

        abort = false;

        diff = targetY - initialY;

        if (typeof easing === "string") {
            easing = easings[easing] || easings["ease"];
        }

        easingFn = BezierEasing.apply(BezierEasing, easing);

        if (!diff) return;

        // _.on(container, abortEvents, abortFn);

        window.requestAnimationFrame(step);
    }

    return scrollTo;
};

const scrollTo = scroller()
export default scrollTo
