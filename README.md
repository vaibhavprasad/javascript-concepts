# javascript-concepts








Promises in Javascript:

Promise is a way of bringing asynchronocity to javascript in a cleaner way. Whenever a data is requested which cannot be returned immediately, the javascript returns a promise instead which gurantees either a value or an error once completed. The same things can be achieved with callbacks but that comes at the cost of <b>Inversion of control</b>. The callee has to execute the callback with the requested data once it is available to him. In promises the control remains with the caller (unlike callbacks where the control goes to the callee who can mess things up).  

Promises in javascript is a web API and is executed in the callback queue of the engine hence acts similar to setTimeout, setInterval and other web APIS.   

Promises has three statuses viz. pending, resolved and rejected.  
  
<b>Pending</b> - The promise remains in this state until it is either rejected or resolved(or abandoned).  
<b>Resolved</b> - This state is achived once the promise is fulfilled.  
<b>Rejected</b> - When a promise fails due to some internal or external error, the status is set to rejected.

Promises can be created using a the javascript Promise constructor as follows.  
```
const promise = new Promise(function (resolve, reject) => {. 
  resolve('resolve immediately');  
});  
``` 
For more code refer to the promises.js file in the code.  

We will use the following code for understanding this article.  

```
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
let p3 = promiseFactory('https://restcountries.eu/rest/v/all?fields=region');
```
      
Promises have many utility methods. The most common among them are **all, race, allSettled**.  
All these methods take an iterator containing promises.  
**Promise.all()** waits for all the promises that have been passed to it to resolve and once resolved, returns an array containing the responses of the promises in the same order that they were passed.  
If any of the promises get rejected, the control moves to the catch block and no data is returned.  
```
Promise.all([p1, p2, p3]).then(data => {  
    data[0] -> result from P1's resolve.  
    data[1] -> result from P2's resolve  
    data[2] -> result from P3's resolve  
}).catch(error => {  
    console.log(error);  
})  
```   
The following is the actual code for **Promise.all()** which will work with the code provided at the begenning of the article:

```
Promise.all([p1,p2,p3]).then(function (data) {
    console.log(data);
}).catch(function (error) {
    console.log(error);
});
```


**Promise.race()** as the name suggests, takes an iterator of promises and returns the result from the promise that resolves first while abandoning the result of other promises. On error or rejection the control moves to the catch block   
  
```
Promise.race([p1, p2, p3]).then(data => {  
    data -> contains the value from one of the promises p1, p2, p3 which resolved first  
}).catch( error => {  
    console.log(error);  
})  
``` 
The following is the actual code for **Promise.race()**

```
Promise.race([p1, p2, p3]).then(function(data) {
    console.log(data);
}).catch(function (error) {
    console.log(error)
})
```
***Promise.race()*** can be used to implement a timeout mechanism which abandons a promise if it doesn't get resolved within a given time. The code can be written as follows:  

```
Promise.race([p1, p2, p3, new Promise(function (resolve, reject) {
    setTimeout(function(){
        reject('Timeout');
    }, 5000)
})]).then(function(data) {
    console.log(data);
}).catch(function (error) {
    console.log(error)
})
```

**Promise.allSettled()** waits for all the promises to either get resolved or rejected and then goes to the next method with the data from the promises. It never goes to the catch block.  

```
Promise.allSettled([p1, p2]).then(data => {
    data ->[{status: "fulfilled", value: Array(250)}, {status: "rejected", reason: SyntaxError: Unexpected end of JSON input}]
});
```  
The success cases are marked with the status ***fulfilled*** along with the data from the promise and the rejected cases are marked with status as ***rejected*** and a reason for rejection is provided.  
  
The following is the actual code for **Promise.race()**.  
  
```
Promise.allSettled([p1, p2, p3, new Promise(function (resolve, reject) {
    reject('manual rejection');
} )]).then(function(data) {
    console.log(data)
}).catch(function (error) {
    console.log(error);
})
```
  
  
