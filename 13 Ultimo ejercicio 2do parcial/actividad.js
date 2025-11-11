function memoize(fn) {
    let c = new Map(), o = new WeakMap(), i = 0;
    return function(...a) {
        let k = a.map(arg => 
            arg === null ? 'null' :
            arg === undefined ? 'undefined' :
            typeof arg === 'object' ? `obj:${o.has(arg) ? o.get(arg) : o.set(arg, ++i).get(arg)}` :
            `${typeof arg}:${arg}`
        ).join('|');
        return c.has(k) ? c.get(k) : c.set(k, fn(...a)).get(k);
    };
}

// Test
let calls = 0;
const sum = (a, b) => (calls++, a + b);
const mSum = memoize(sum);

console.log(mSum(2, 3)); // 5
console.log(mSum(2, 3)); // 5 (cache)
console.log(calls); // 1