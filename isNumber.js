function isNumber(obj) {
  return typeof obj === 'number' && !isNaN(obj);
}

module.exports = isNumber;
