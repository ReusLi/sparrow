import attributeConfig from '../../src/pages/leftPart/attributeConfig/index.ts'

var assert = require('assert');
describe('attributeConfig', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      // console.log(attributeConfig)
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});