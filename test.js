var isNumber = require('./isNumber.js');
var inTurn = require('./inTurn.js');
var random = require('./random-list.js');
var sort = require('./sort.js');
var expect = require('chai').expect;

describe('基础功能函数测试', function() {
  it('isNumber(): 判断是否为数组', function() {
    expect(isNumber(1)).to.be.true;
    expect(isNumber(-1)).to.be.true;
    expect(isNumber(0)).to.be.true;
    expect(isNumber(false)).to.not.be.true;
    expect(isNumber('1')).to.not.be.true;
    expect(isNumber(NaN)).to.not.be.true;
  });

  it('inTurn(): 判断是否为数组', function() {
    expect(inTurn([1, 2, 3])).to.be.true;
    expect(inTurn([1, 2, 1])).to.not.be.true;
  });

  it('random(): 生成随机整形数组', function() {
    var list = random();
    expect(list).to.have.lengthOf(20);
    var allIsNumber = true;
    list.forEach(function(v) {
    	/* istanbul ignore if  */
      if (!isNumber(v)) allIsNumber = false;
    });
    expect(allIsNumber).to.be.true;
    expect(random(30, 50)).to.have.lengthOf(30);
    expect(random(30)).to.have.lengthOf(30);
    expect(random(null, 50)).to.have.lengthOf(20);
  });
});


describe('排序算法测试', function() {
  for (let key in sort) {
    it(key, function() {
    	var testList = random();
      var res = sort[key](testList);
      expect(inTurn(res)).to.be.true;
    });
  }
});
