import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({adapter: new Adapter()});

describe("<NavigationItems />", () => {
    let wrapper
    
    beforeEach(() => {
        wrapper = shallow(<NavigationItems/>);
    }); 

    it("Should render two <Navigation Item /> elements if not authenticated", () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it("Should render three <Navigation Item /> elements if authenticated", () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it("Should render Logout navigation if authenticated", () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});