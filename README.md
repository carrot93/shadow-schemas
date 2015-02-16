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
      this.valid('is a string')
    } else {
      this.invalid('must be a string')
    }
  },
  explicit: function (value) {
    if (value === 'Jane') {
      this.valid('is Jane')
    } else {
      this.invalid('must be Jane')
    }
  },
  generic: functional (value) {
    try {
      //can be an array or {lon: Number, lat: Number}
      var latLng = L.latLng(value);
      if (_.isNumber(latLng.lat) && _.isNumber(latLng.lng)) {
        this.invalid('is Geo Location')
      } else {
        this.invalid('must have both latitude and longitude')  
      }
    } catch (e) {
      this.invalid('must be a valid GeoLocaton')
    }
  },
  'nested.properties': function (value) {
    if (value) { //you may wish to type check booleans to save db space
      this.valid('is true')
    } else {
      this.invalid('must be true')
    }
  }
})
```

## 
```js
exampleId = Example.insert({
  typed: 'a string',
  explicit: 'Joe'
})
example = Example.findOne(exampleId)

example.$validate('typed');
//{valid: true, message: "is a string"}

example.$validate('explicit');
//{valid: false, message: "must be Jane"}

example.$validate('generic');
//{valid: true, message: ""}

example.$validate('nested.properties');
//{valid: true, message: "is true"}
```
