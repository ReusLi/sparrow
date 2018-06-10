import {ShallowRenderer} from 'react-test-renderer';

// import { shallow } from 'enzyme';

import LeftPart from 'pages/leftPart'

import chai from 'chai'

let assert = chai.assert;

describe('left part code', function () {
    describe('init', function () {
        it('checking the left part file has import', function () {
            const renderer = new ShallowRenderer();
            renderer.render(<LeftPart />);
            const test = renderer.getRenderOutput();
            console.log(test)
            assert.exists(test.modifyModelByUUID)
        })
    })
})