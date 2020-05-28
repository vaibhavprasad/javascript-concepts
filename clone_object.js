/*
* Utility to deep clone one object into another
* Vaibhav Prasad
*/

function cloneObj(jsonObj) {
    let typeMap = {
        'undefined': 'primitive',
        'null': 'primitive',
        'number': 'primitive',
        'string': 'primitive',
        'boolean': 'primitive',
        'symbol': 'primitive',
        'object': 'object',
        'function': 'function'
    };

    var clonedObj = (function cloneRec(obj,clone) {
        let keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            if (typeMap[typeof obj[keys[i]]] === 'primitive' || typeMap[typeof obj[keys[i]]] === 'function') {
                clone[keys[i]] = obj[keys[i]];
            } else {
                clone[keys[i]] = cloneRec(obj[keys[i]], {});
            }   
        }
        return clone;
    })(jsonObj, {});
    return clonedObj;
}

/* Utility Ends Here*/

/* Deeply nested sample Test object containing functions, objects etc. */
var obj = {
    personalDetails: {
        fname: 'vaibhav',
        lname: 'prasad',
        dob: '1990-04-24',
        age(){
            var age = (new Date() - new Date('1990-04-24'))/(1000 * 60 * 60 * 24 * 365);
            return Number(age.toFixed());
        }
    },
    educationalDetails: {
        highestDegree: 'MCA',
        institute: 'NITC',
        CGPA: '7.5'
    },
    professionalDetails: {
        comapany: 'Acalvio',
        designation: 'MTS',
        role: 'ui developer',
        teamMembers: [
            {name: 'Anantha', designation: 'MTS', role: 'ui developer'},
            {name: 'Ashish', designation: 'MTS', role: 'ui developer'},
            {name: 'Jameel', designation: 'MTS', role: 'manager'},
            {name: 'Narayan', designation: 'MTS', role: 'visualization lead'}
        ]
    }
}

var res = cloneObj(obj);
