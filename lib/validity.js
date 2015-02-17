Validity = {}
Validity.create = function (target, vals) {
  _.keys(vals).forEach(function (validation) {
    target[validation] = _.bind(vals[validation], validity)
  });
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
    collection.validations = function (vals) {
      collection._validations = {}
      Validity.create(collection._validations, vals)
    }
  },
  transform: function (doc, collection, shadow) {
    if (collection._validations) {
      doc['$validate'] = function (key) {
        return collection._validations[key](Validity._getProperty(doc, key))
      }
    }
    return doc;
  }
});