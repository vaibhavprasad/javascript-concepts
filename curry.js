// The following function when run with a function as an argument, returns the curried version of the function 
// which can then be invoked with the necessary parameters

function curry (cb) {
    return function temp (...b) {
        if (cb.length === b.length) {
            return cb.apply(this, b);
        } else {
            return temp.bind(this, ...b);
        }
    }
}

function add(a, b, c) {
    return a + b + c;
}

var curryAdd = curry(add);

curryAdd(1)(2)(3);

curryAdd(1)(2, 3);

curryAdd(1, 2)(3);
