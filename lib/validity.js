Validity = {}
Validity.create = function (func) {
  return _.bind(func, validity)
}

validity = {
  valid: function (message) {
    return {
      valid: true,
      message: message
    }
  },
  invalid: function (message) {
    message = message || 'No reason given.' 
    return {
      valid: false,
      message: message
    }
  }
}

Validity._getProperty = function (obj, keyString) {
  var keys = keyString.split('.');
  _.each(keys, function (key) {
    if (!_.isObject(obj) || !obj[key]) {
      throw new Error('Validity: Unknown Property ' + key + ' in string ' + keyString)
    }
    obj = obj && obj[key];
  });
  return obj;
};

addShadow({
  before: function (collection, args) {
    collection.validations = function (obj) {
      collection._validations = {}
      _.keys(obj).forEach(function (validation) {
        collection._validations[validation] = Validity.create(obj[validation])
      });
    }
  },
  transform: function (doc, collection, shadow) {
    doc['$validate'] = function (key) {
      return collection._validations[key](Validity._getProperty(doc, key))
    }
    return doc;
  }
});