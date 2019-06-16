const { hello } = require("./index");

describe(hello, () => {
  it('should return "hello, world"', () => {
    expect(hello()).toEqual("hello, world");
  });
});
