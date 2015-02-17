Validity
===============
Validity is functional schema.

###### Warning: This readme is out of date for the master branch! Massive changes are underway.


## Summary 


## Usage

```js
Example = new Mongo.Collection('example');

Example.validations({
  typed: function (value) {
    if (_.isString(value)) {
      return this.valid('is a string')
    } else {
      return this.invalid('must be a string')
    }
  },
  explicit: function (value) {
    if (value === 'Jane') {
      return this.valid('is Jane')
    } else {
      return this.invalid('must be Jane')
    }
  },
  generic: function (value) {
    try {
      //can be an array or {lon: Number, lat: Number}
      var latLng = L.latLng(value);
      if (_.isNumber(latLng.lat) && _.isNumber(latLng.lng)) {
        return this.invalid('is Geo Location')
      } else {
        return this.invalid('must have both latitude and longitude')  
      }
    } catch (e) {
      return this.invalid('must be a valid GeoLocaton')
    }
  },
  descriptive: function (value) {
    var email = someEmailValidator(value) //readme shortcut -_^
    if (email) {
      if (email == 'gmail') {
        return this.valid('is a Gmail email')
      } else if (email == 'apple') {
        return this.valid('is an Apple email')
      } else { //and so on
       return this.valid('is email')
      }
    } else {
      return this.invalid('must be an email') //you would want to be more descriptive...
    }
  },
  'nested.properties': function (value) {
    if (value) { //you may wish to type check booleans to save db space
      return this.valid('is true')
    } else {
      return this.invalid('must be true')
    }
  }
})
```

## 
```js
exampleId = Example.insert({
  typed: 'a string',
  explicit: 'Joe',
  generic: {lat: 60, lng: 60},
  descriptive: 'example@icloud.com'
  nested = {
    properties: true
  }
})
example = Example.findOne(exampleId)

example.$validate('typed');
//{valid: true, message: "is a string"}

example.$validate('explicit');
//{valid: false, message: "must be Jane"}

example.$validate('generic');
//{valid: true, message: "is Geo Location"}

example.$validate('descriptive');
//{valid: true, message: "is an Apple email"}

example.$validate('nested.properties');
//{valid: true, message: "is true"}
```
