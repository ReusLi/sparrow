import attributeConfig from 'pages/leftPart/attributeConfig'

import chai from 'chai'

let assert = chai.assert;

describe('attributeConfig', function () {
  describe('attribute`s checklist', function () {
    it('should have attributeName, option and defaultValue', function () {
      attributeConfig.forEach(function (attribute) {
        assert.exists(attribute.attributeName)
        assert.exists(attribute.option)
        assert.exists(attribute.defaultValue)
      })
    })
  })
})