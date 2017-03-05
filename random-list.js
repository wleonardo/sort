var isNumber = require('./isNumber.js');

var random = function(range) {
  return parseInt(Math.random() * range);
}
module.exports = function(len, range) {
  range = range || 100;
  len = len || 20;
  /* istanbul ignore if  */
  if (!isNumber(len)) throw new Error('len is not a number, its' + len.toString());
  /* istanbul ignore if  */
  if (!isNumber(range)) throw new Error('range is not a number, its' + range.toString());
  var res = [];
  for (var i = len - 1; i >= 0; i--) {
    res.push(random(range));
  }
  return res;
};
