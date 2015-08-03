var assert = require('assert');
var SQLike = require('../sqlike');

// Test data as array of arrays
var testData = [["Richard", "Green", 29, 38000], ["Stuart", "Steele", 68, 20000], ["Vicki", "Copperfield", 65, 20000], ["John", "Smith", 69, 75000], ["Susanna", "Irons", 65, 79000], ["Debbi", "Irons", 36, 63000], ["Richard", "Jones", 22, 58000], ["Debbi", "Black", 32, 96000], ["George", "Black", 45, 70000], ["George", "Irons", 48, 32000]];
var original = testData.slice(0);

// Unpack our data and test it works
SQLike.q({
    Unpack: testData,
    Columns: ['firstName', 'lastName', 'age', 'salary']
});

assert.ok(original[0][0] === testData[0].firstName);

// Basic select test
var result = SQLike.q({
   Select: ['*'],
   From: testData,
   Where: function() { return this.salary > 50000; },
   OrderBy: ['salary', '|desc|']
});

assert.ok(result.length === 6);

// Insert into test
var newVals =  { firstName: 'Josh', lastName: 'Girvin', age: 24, salary: 1000000 };
SQLike.q({
    InsertInto: testData,
    Values: newVals
});

assert.equal(testData[testData.length - 1], newVals);

console.log('All assertions passed!');
