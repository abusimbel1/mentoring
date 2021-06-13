import sayHello from './sayHelloWorld';


describe('Get "Hello" string', () => {
  test('Hello string', () => {
    expect(sayHello()).toBe('Hello');
  })
})