module.exports = function(arr) {
  var isInTurn = true;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > arr[i + 1]) {
      isInTurn = false;
      break;
    }
  }
  return isInTurn;
};
