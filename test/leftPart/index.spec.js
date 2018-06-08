import LeftPart from 'pages/leftPart'

import chai from 'chai'

let assert = chai.assert;

describe('left part code', function () {
    describe('init', function () {
        it('checking the left part file has import', function () {
            console.log(LeftPart)
            assert.exists(LeftPart.modifyModelByUUID)
        })
    })
})