// the following function takes in a function and an interval as input and returns a function which will run once and then accepts no more requests 
// until the interval has elapsed

function throttle (interval, fn) {
    let busy = false;
    return function (...b) {
        if (!busy) {
            busy = true;
            fn.apply(this, b);
            setTimeout(() => {
                busy = false;
            }, interval);
        }
    }
}

function addNos (a, b) {
    console.log(a + b);
}

throttledAdd = throttle(1000, addNos);
throttledAdd(4,5);
throttledAdd(8,5);
throttledAdd(4,1);
throttledAdd(8,8);
