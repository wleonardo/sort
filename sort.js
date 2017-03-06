var arr = [2, 1, 3, 5, 6, 3, 1, 4];

var swap = function(arr, p1, p2) {
  var cache = arr[p1];
  arr[p1] = arr[p2];
  arr[p2] = cache;
};

var count = 0;
var sort = {};
//冒泡排序 O(n^2) 稳定
sort.bubble = function(arr) {
  var bubbleOnce = function(arr, end) {
    for (var i = 0; i < end; i++) {
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1);
      }
    }
  };
  var i = arr.length - 1;
  while (i) {
    bubbleOnce(arr, i);
    i--;
  }
  return arr;
};
//插入排序 O(n^2)
sort.insert = function(arr) {
  var len = arr.length;
  var insertOnce = function(pos) {
    var num = arr[pos];
    for (var j = pos - 1; j >= -1; j--) {
      //比较插入的值和当前位置的值，当前位置比较大，则当前位置后移一位，否者就当前位置设置为插入值
      if (arr[j] > num) {
        arr[j + 1] = arr[j];
      } else {
        arr[j + 1] = num;
        break;
      }
    }
  }
  for (var i = 0; i < len; i++) {
    insertOnce(i);
  }
  return arr;
};

//快速排序 O(nlogn)
sort.quick = function(arr) {
  if (arr.length < 2) {
    return arr;
  }
  var middleNum = arr[0];
  var left = [];
  var right = [];
  for (var i = 1; i < arr.length; i++) {
    var num = arr[i];
    //这里使用>=，而不是=，是为了即使两个数字相同，也要让本来在后面的数字放在后面，保证排序的稳定
    if (num >= middleNum) {
      right.push(num);
    } else {
      left.push(num);
    }
  }
  left = sort.quick(left);
  right = sort.quick(right);
  return left.concat([middleNum], right);
};

//选择排序 O(n^2)
sort.selection = function(arr) {
  //获取指定区域内容的最小的数字的位置
  var getMinPosition = function(start) {
    var minIndex = start;
    var minTemp = arr[start];
    for (var i = start + 1; i < arr.length; i++) {
      var c = arr[i];
      if (minTemp > c) {
        minTemp = c;
        minIndex = i;
      }
    }
    return minIndex;
  };
  for (var i = 0; i < arr.length; i++) {
    var minIndex = getMinPosition(i);
    //判断最小的数字的位置是否和当前一致，如果不是，则调换位置
    if (minIndex != i) {
      swap(arr, minIndex, i);
    }
  }
  return arr;
};

// 归并排序 O(nlogn)
sort.merge = function(arr) {
  if (arr.length < 2) {
    return arr;
  }
  var len = Math.ceil(arr.length / 2);// 一半的长度
  var left = arr.slice(0, len); // 获取左半部分的元素
  var right = arr.slice(len); // 获取右半部分的元素
  var mergeOnce = function(left, right) {
    var res = [];
    var leftIndex = 0,
      rightIndex = 0;
    while (leftIndex < left.length || rightIndex < right.length) {
      var i1 = left[leftIndex];
      var i2 = right[rightIndex];
      if (i1 <= i2 || i2 === undefined) {
        res.push(i1);
        leftIndex++;
      } else {
        res.push(i2);
        rightIndex++;
      }
    }
    return res;
  }
  return mergeOnce(sort.merge(left), sort.merge(right));
}

module.exports = sort;
