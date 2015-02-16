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
      return collection._validations[key](doc[key])
    }
    return doc;
  }
});