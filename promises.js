// The following program contains basic implementation of promises, promise chaining, sequencing promises resolves

function getAsyncData (url, cb) {
    fetch(url).then(data => {
        return cb(data.json());
    })
}

function promiseFactory (url) {
    return new Promise(function (resolve, reject) {
        getAsyncData(url, resolve);
    });
}

let p1 = promiseFactory('https://restcountries.eu/rest/v2/all?fields=name');
let p2 = promiseFactory('https://restcountries.eu/rest/v2/all?fields=capital');
let p3 = promiseFactory('https://restcountries.eu/rest/v2/all?fields=region');

p1.then(function(data) {
    console.log(data);
}).then(function() {
    return p2;
}).then(function(data){
     console.log(data);
}).then(function () {
    return p3;
}).then(function (data) {
   console.log(data);
}).catch(function (error){
    console.log('the error', error);
});

// fire p1 in the begenning and then upon resolve fire other promises in parallel
// p1.then(function (data) {
//     console.log(data);
//     var p2 = promiseFactory('https://restcountries.eu/rest/v2/all?fields=capital');
//     var p3 = promiseFactory('https://restcountries.eu/rest/v2/all?fields=region');
// }).then(function () {
//     return p2;
// }).then(function (data) {
//     console.log(data);
// }).then(function () {
//     return p3;
// }).then(function(data) {
//     console.log(data);
// })
