import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai'

import LeftPart from 'pages/leftPart'

Enzyme.configure({ adapter: new Adapter() });

describe('left part code', function () {
    describe('init', function () {
        it('checking the left part file has import', function () {
            const wrapper = shallow(<LeftPart />);

            // const num = wrapper.instance().testforenzyme()

            expect(num).to.be.equal(1);
        })
    })
})