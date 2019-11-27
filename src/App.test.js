import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

// Setup
configure({ adapter: new Adapter() });
var div = null;
var instance = null;

beforeEach(() => {
  div = document.createElement("div");
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(div);
  div.remove();
  div = null;
});

// Unit tests
describe("render tests", () => {

	it("renders app without crashing", () => {
  		ReactDOM.render(<App/>, div);
	});

	it("heading is created", () => {
		const wrap = shallow(<App/>);
		expect(wrap.find("h1")).toHaveLength(1);
	});

	it("footer is created", () => {
		const wrap = shallow(<App/>);
		expect(wrap.find("a")).toHaveLength(1);
	});

	it("all buttons are created", () => {
		const wrap = shallow(<App/>);
		expect(wrap.find("button")).toHaveLength(3);
	});

	it("all textboxes are created", () => {
		const wrap = shallow(<App/>);
		expect(wrap.find("input")).toHaveLength(2);
	});

	it("renders default name in heading", () => {
		ReactDOM.render(<App/>, div);
		expect(div.querySelector("h1").textContent).toContain("Chuck Norris");
	});
});

describe("logic tests", () => {
	beforeEach(() => {
  		instance = TestRenderer.create(<App/>).getInstance();
	});

	afterEach(() => {
  		instance = null;
	});

	it("correct first name input", () => {
		const event = { target:
			{
				name: "fname",
				value: "John"
			}
		};
		instance.updateName(event);
		expect(instance.state.fname).toEqual("John");
	});

	it("validate first name input (special char)", () => {
		const temp = window.alert; // Suppress alert for test
		window.alert = () => {}; 
		const event = { target:
			{
				name: "fname",
				value: "<"
			}
		};
		instance.updateName(event);
		expect(instance.state.fname).toEqual("Chuck");
		window.alert = temp; // Restore alert
	});

	it("validate first name input (number)", () => {
		const temp = window.alert;
		window.alert = () => {}; 
		const event = { target:
			{
				name: "fname",
				value: "123"
			}
		};
		instance.updateName(event);
		expect(instance.state.fname).toEqual("Chuck");
		window.alert = temp;
	});

	it("validate first name input (whitespace)", () => {
		const temp = window.alert;
		window.alert = () => {}; 
		const event = { target:
			{
				name: "fname",
				value: " "
			}
		};
		instance.updateName(event);
		expect(instance.state.fname).toEqual("Chuck");
		window.alert = temp;
	});

	it("validate first name input (empty)", () => {
		const temp = window.alert;
		window.alert = () => {}; 
		const event = { target:
			{
				name: "fname",
				value: ""
			}
		};
		instance.updateName(event);
		expect(instance.state.fname).toEqual("Chuck");
		window.alert = temp;
	});

	it("correct last name input", () => {
		const event = { target:
			{
				name: "lname",
				value: "Doe"
			}
		};
		instance.updateName(event);
		expect(instance.state.lname).toEqual("Doe");
	});

	it("validate last name input (special char)", () => {
		const temp = window.alert; // Suppress alert for test
		window.alert = () => {}; 
		const event = { target:
			{
				name: "lname",
				value: "<"
			}
		};
		instance.updateName(event);
		expect(instance.state.lname).toEqual("Norris");
		window.alert = temp; // Restore alert
	});

	it("validate last name input (number)", () => {
		const temp = window.alert;
		window.alert = () => {}; 
		const event = { target:
			{
				name: "lname",
				value: "123"
			}
		};
		instance.updateName(event);
		expect(instance.state.lname).toEqual("Norris");
		window.alert = temp; 
	});

	it("validate last name input (whitespace)", () => {
		const temp = window.alert;
		window.alert = () => {}; 
		const event = { target:
			{
				name: "lname",
				value: " "
			}
		};
		instance.updateName(event);
		expect(instance.state.lname).toEqual("Norris");
		window.alert = temp; 
	});

	it("validate last name input (empty)", () => {
		const temp = window.alert; 
		window.alert = () => {}; 
		const event = { target:
			{
				name: "lname",
				value: ""
			}
		};
		instance.updateName(event);
		expect(instance.state.lname).toEqual("Norris");
		window.alert = temp; 
	});
});
