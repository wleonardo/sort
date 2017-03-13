var sort = require('./sort.js');

var randomList = require('./random-list.js');

var list = randomList();

var slice = Array.prototype.slice;

var getTime = function() {
  return (new Date()).getTime();
};

var countRunTime = function(fn) {
  var startTime = getTime();
  var args = slice.call(arguments, 1);
  var res = fn.apply(this, args);
  return '运行：' + (getTime() - startTime).toString() + 'ms';
};

for (let key in sort) {
	console.log(key);
  var arr = list.slice();
  var runtime = countRunTime(sort[key], randomList(20000, 100000));
  console.log(runtime);
}
