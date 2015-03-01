addShadow({
  before: function (collection, args) {
    collection.schema = function (vals) {
      collection._validations = {};
      collection._defaults = {};
      collection._instanceField = _.keys(vals);
      collection._whitelist = collection._instanceField.slice(0)
      collection._whitelist.push('_id')
      _.keys(vals).forEach(function (field) {
        if (_.isFunction(vals[field])) {
          collection._validations[field] = _.bind(vals[field], validity);
        } else {
          if (_.isFunction(vals[field].validation)) {
            collection._validations[field] = _.bind(vals[field].validation, validity);
          } else {
            collection._validations[field] = _.bind(noop, validity);
          }
          if (vals[field].default) {
            collection._defaults[field] = vals[field].default;
          }
        }
      });
    }
  },
  transform: function (doc, collection, shadow) {
    if (collection._validations) {
      doc['$validate'] = function (key) {
        if (key) {
          return collection._validations[key](ShadowUtil.getPropertyByString(doc, key))
        }
        var valid = {};
        collection._instanceField.forEach(function (key) {
          valid[key] = collection._validations[key](ShadowUtil.getPropertyByString(doc, key))
        });
        return valid;
      }
      doc['$data'] = function () {
        var data = {};
        collection._instanceField.forEach(function (key) {
          ShadowUtil.setPropertyByString(data, key, ShadowUtil.getPropertyByString(doc, key))
        });
        return data
      }
    }
    return doc;
  },
  after: function (collection) {
    if (!collection._name) {
      return;
    }
    //validate persistence
    collection.before.insert(function (userId, doc) {
      if (!collection._instanceField) { return true } //no schema don't validate

      var transformedDoc = {};
      _.each(doc, function (value, key) {
        transformedDoc[key] = value;
      });

      var badKeys = ShadowUtil.getBlacklistKeys(transformedDoc, collection._whitelist);
      if (badKeys.length) {
        throw new Error('Shadow Schema: forbidden keys: ' + badKeys.join(', '))
      }

      collection._transform(transformedDoc)
      var error = isInvalid(transformedDoc['$validate']());
      if (error) {
        throw new Error('Shadow Schema: ' + error)
        return false;
      }
    });
    //validate updates and upserts
    collection.before.update(function (userId, doc, fieldNames, modifier, options) {
      if (!collection._instanceField) { return true } //no schema don't validate

      var updatedDoc = ShadowUtil.MockUpdate(doc, modifier, options);

      var badKeys = ShadowUtil.getBlacklistKeys(updatedDoc, collection._whitelist);
      if (badKeys.length) {
        throw new Error('Shadow Schema: forbidden keys: ' + badKeys.join(', '))
      }

      collection._transform(updatedDoc)
      var error = isInvalid(updatedDoc['$validate']());
      if (error) {
        throw new Error('Shadow Schema: ' + error)
        return false;
      }
    });
  }
});

var validity = {
  valid: function (message) {
    return {
      valid: true,
      message: message
    }
  },
  invalid: function (message) {
    message = message;
    return {
      valid: false,
      message: message
    }
  }
}

var isInvalid = function (validationObject) {
  var keys = _.keys(validationObject), error;
  keys.forEach(function (key) {
    if (!validationObject[key].valid) {
      error = key + ' ' + validationObject[key].message;
    }
  });
  return error;
}

var noop = function () {
  return this.valid()
}