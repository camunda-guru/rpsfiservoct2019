import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


describe('App component', () => {
  it('title test', () => {
    const wrapper = shallow(<App />);
    const size = wrapper.find('h4').length;
    expect(size).toEqual(2);
  });

});


//mock
/*
const clickFn = jest.fn();
describe('MyComponent', () => {
  it('button click should hide component', () => {
    const component = shallow(<MyComponent onClick={clickFn} />);
    component
        .find('button#my-button-two')
        .simulate('click');
    expect(clickFn).toHaveBeenCalled();
  });
});
*/

/*
describe('App', () => {
  describe('Reducer', () => {
    ...
  });
  ...
  it('passes all props to Counter', () => {
    const wrapper = mount(<App />);
    const counterWrapper = wrapper.find(Counter);
    expect(counterWrapper.find('p').text()).toEqual('0');
  });
  it('increments the counter', () => {
    const wrapper = mount(<App />);
    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    const counterWrapper = wrapper.find(Counter);
    expect(counterWrapper.find('p').text()).toBe('1');
  });
  it('decrements the counter', () => {
    const wrapper = mount(<App />);
    wrapper
      .find('button')
      .at(1)
      .simulate('click');
    const counterWrapper = wrapper.find(Counter);
    expect(counterWrapper.find('p').text()).toBe('-1');
  });
});
describe('Counter', () => {
  ...
});
 */

/*
jest.mock('axios', () => {
  const exampleArticles = [
    { title: 'test article', url: 'test url' }
  ];

  return {
    get: jest.fn(() => Promise.resolve(exampleArticles)),
  };
});

const axios = require('axios');

it('fetch articles on #componentDidMount', () => {
  const app = shallow(<App />);
  app
    .instance()
    .componentDidMount()
    .then(() => {
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get).toHaveBeenCalledWith('articles_url');
      expect(app.state()).toHaveProperty('articles', [
        { title: 'test article', url: 'test url' }
      ]);
      done();
    });
});

 */
