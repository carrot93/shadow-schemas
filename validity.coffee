Validity = 
  _validityResult: ->
    valid: false 
    message: 'No reason given, someone got lazy.' 
  allow: ->
    validityResult = @_validityResult()
    validityResult.valid = true
    validityResult.message = undefined
    validityResult
  deny: (message) ->
    validityResult = @_validityResult()
    validityResult.message = message if message
    validityResult
