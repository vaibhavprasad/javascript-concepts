// Composing means executing functions one after another in a sequence from right to left
// Piping functions means executing frunctions one after another in a sqquence from left to right

function compose (...fns) {
    return function (...b) {
        for (let j = fns.length - 1; j >= 0; j--) {
            b = fns[j].apply(this, b);
            b = [].concat(b);
        }
        let [temp] = b
        return temp;
    }
}

function sum (a,b) {
    return a + b;
}

function multBy5 (a) {
    return a * 5;
}

function abs (a) {
    return Math.abs(a);
}

var composed = compose(abs, multBy5, sum);

function pipe (...fns) {
    return function (...b) {
        for (let i = 0; i < fns.length; i++) {
            b = fns[i].apply(this, b);
            b = [].concat(b);
        }
        let [temp] = b;
        return temp;
    }
}

var piped = pipe(sum, abs, multBy5);

