const trace = text => func => {
  const result = func();
  console.log(text, result);
  return result;
};

const asyncTrace = text => async func => {
  const result = await func();
  console.log(text, result);
  return result;
};

module.exports = { trace, asyncTrace };
