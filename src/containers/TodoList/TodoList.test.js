import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Lists from '../../components/Todo/Lists/Lists';

configure({adapter: new Adapter()});
import {TodoList} from './TodoList';

describe('<TodoList />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<TodoList onResetList={()=>{}}/>);
    });
    it('should render <Lists /> when receiving lists', () => {
        wrapper.setProps({lists: [{todo: 'test'}]});
        expect(wrapper.find(Lists)).toHaveLength(1);
    });
});