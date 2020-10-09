// The following function takes a function and a timeout as input and returns a function which if executed before the timeout
// happens, resets the timer.


function debounce (timeout, fn) {
    let intervalhandler = null;
    return function (...b) {
        clearTimeout(intervalhandler);
        intervalhandler = setTimeout(() => {
            return fn.apply(this, b);
        }, timeout);
    }
}


function addNos (a,b) {
    console.log(a + b);
}
// debounce(5000, addNos)(4, 5);
var debouncedAdd = debounce(5000, addNos);

debouncedAdd(4,5);

