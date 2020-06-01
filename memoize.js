// A basic implementation of memoization in javascript. This exploits closures to achieve the required functionality

function memoize (cb) {
    const memo = {};
    return function (...b) {
        let key = JSON.stringify(b);
        if (!memo[key]) {
            memo[key] = cb.apply(this, b);
            
        }
        return memo[key];
    }
}

function add (a, b, c) {
  return a + b +c;
}

const memoAdd = memoize(add);

memoAdd(2, 3, 4);
