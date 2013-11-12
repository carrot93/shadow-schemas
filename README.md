Validity
===============
Validity is a very simple validation pattern aimed at maximum flexibility.

###### This is an [Atmosphere](https://atmosphere.meteor.com/) complient smart package for Meteorite (Meteor). 
Install with `mrt add validity`, this package has no dependencies.

This project is intended to be a dependency of [ReactiveSchema](https://github.com/CMToups/meteor-reactive-schema)

## Summary 
This package gives you a Validity object that lets you call `Validity.allow()` and  `Validity.deny(\*message*\)`.
Everyone has different uses cases for validation, and more often then not you end up having to hack your way around a gridlocked codebase.
This package just lets you pass some data into a function and test if it meets your criteria. 
Its simple and resuable anywhere on the server or client.


## Usage

```js

isAwesome = function (value) {

  // define your validation of awesome

  if (value == awesome)
    return Validity.allow()
  else
    return Validity.deny('not awesome enough')
}
```

## Output

```js
awesomeOutput = isAwesome(awesomeValue)

awesomeOutput.valid
=> true

awesomeOutput.message
=> undefined
```
or

```js
invalidOutput = isAwesome(invalidValue)

invalidOutput.valid
=> false

invalidOutput.message
=> 'not awesome enough'
```

## Test n Spec  [![Build Status](https://travis-ci.org/Meteor-Reaction/meteor-validity.png)](https://travis-ci.org/Meteor-Reaction/meteor-validity) 


This package is fully specced out in tinytest. 
If you want a feature added just post an issue or a pull request.


At the time of this writing all tests were passing. 
You can test the pacakage by running `mrt test-packages <path to package>`



