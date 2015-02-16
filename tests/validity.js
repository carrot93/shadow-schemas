//_validityResult
Tinytest.add('Validity - _validityResult exist and is a new object for each validation', function(test) {
   test.isTrue(Validity._validityResult, '_validityResult should exist')
   validityVarObj =  Validity._validityResult()
   test.isTrue(validityVarObj.hasOwnProperty('valid'), '_validityResult should have valid prop')
   test.isTrue(validityVarObj.hasOwnProperty('message'), '_validityResult should have message prop')
});

Tinytest.add('Validity - _validityResult should have predefined values', function(test) {
   validityVarObj =  Validity._validityResult()
   test.isFalse(validityVarObj.valid, '_validityResult valid should default to false')
   test.equal(validityVarObj.message, 'No reason given, someone got lazy.', '_validityResult should have message prop')
});


Tinytest.add('Validity - allow should return a useful validation response', function(test) {
   allowOutput = Validity.allow()
   test.isTrue(allowOutput.valid, 'should be true')
   test.isFalse(allowOutput.message, 'should not have a message')
});

Tinytest.add('Validity - deny should return a validation response w/ default value', function(test) {
   denyOutput = Validity.deny()
   test.isFalse(denyOutput.valid, 'should be false')
   test.equal(denyOutput.message, 'No reason given, someone got lazy.', 'should have a default message')
});

Tinytest.add('Validity - deny should allow for a custom validation message', function(test) {
   denyOutput = Validity.deny('message')
   test.isFalse(denyOutput.valid, 'should be false')
   test.equal(denyOutput.message, 'message', 'should have a custom message')
});
