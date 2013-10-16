meteor-validity
===============
A very simple validation pattern aimed at maximum flexibility. 
This package gives you a Validity object that lets you call `Validity.allow()` and  `Validity.deny(\*message*\)`.
Everyone has different uses cases for validation and sometimes just need to pass some data into a function and test if it meets your criteria. 


# Usage

```js

isAwesome = function (value) {

  // define your validation of awesome

  if (value == awesome)
    return Validity.allow()
  else
    return Validity.deny('not awesome enough')
}
```

#Output

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



