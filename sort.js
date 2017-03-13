var randomList = require('./random-list.js');
//(排序的稳定性是指如果在排序的序列中，存在前后相同的两个元素的话，排序前 和排序后他们的相对位置不发生变化)
var arr = [2, 1, 3, 5, 6, 3, 1, 4];

var swap = function(arr, p1, p2) {
  var cache = arr[p1];
  arr[p1] = arr[p2];
  arr[p2] = cache;
};

var getMaxNumber = function(array) {
  var max;
  array.forEach(function(v) {
    if (max === undefined) {
      max = v;
    } else {
      max = max >= v ? max : v;
    }
  })
  return new Number(max);
};

var getMinNumber = function(array) {
  var min;
  array.forEach(function(v) {
    if (min === undefined) {
      min = v;
    } else {
      min = min < v ? min : v;
    }
  })
  return new Number(min);
};

var flatten = function(array) {
  var res = [];
  array.forEach(function(v) {
    res = res.concat(v);
  });
  return res;
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
  var len = Math.ceil(arr.length / 2); // 一半的长度
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
  };
  return mergeOnce(sort.merge(left), sort.merge(right));
};

//希尔排序 O(nlog²n)
sort.shell = function(arr) {
  var gap = Math.floor(arr.length / 2);
  var shellOnce = function(gap) {
    for (var i = gap; i < arr.length; i++) {
      var temp = arr[i];
      for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j];
      }
      arr[j + gap] = temp;
    }
  };
  for (; gap > 0; gap = Math.floor(gap / 2)) {
    shellOnce(gap);
  }
  return arr;
};

/*
  var heapify = function(level) {
    for (var i = Math.ceil(arr.length / 2) - 1; i >= Math.pow(2, level - 1) - 1; i--) {
      var left = i * 2 + 1;
      var right = i * 2 + 2;
      var childLargeIndex;
      if (arr[right] && arr[left] < arr[right]) {
        childLargeIndex = right;
      } else {
        childLargeIndex = left;
      };

      if (arr[i] < arr[childLargeIndex]) {
        swap(arr, i, childLargeIndex);
      }
    };
  };
  for (var i = 1; i <= Math.floor(Math.log2(arr.length + 1)); i++) {
    heapify(i);
  }
 */
// 堆排序 O(nlogn)
sort.heap = function(arr) {
  var heapify = function(array, parentIndex, len) {
    var left = parentIndex * 2 + 1;
    var right = parentIndex * 2 + 2;

    var childLargeIndex;
    if (right < len && array[left] < array[right]) {
      childLargeIndex = right
    } else if (left < len) {
      childLargeIndex = left;
    } else {
      return false;
    }

    if (array[parentIndex] < array[childLargeIndex]) {
      swap(array, parentIndex, childLargeIndex);
      heapify(array, childLargeIndex, len);
    }
  };

  for (var i = Math.floor(arr.length / 2); i >= 0; i--) {
    heapify(arr, i, arr.length);
  }
  var len = arr.length;
  for (var i = len - 1; i >= 1; i--) {
    swap(arr, 0, i);
    heapify(arr, 0, --len);
  }
  return arr;
};

// 基数排序
sort.radix = function(arr) {

  var creatBucket = function() {
    var cache = [];
    for (var i = 9; i >= 0; i--) {
      cache.push([]);
    }
    return cache;
  };



  var maxNumber = getMaxNumber(arr);
  var length = maxNumber.toString().length;

  var radixOnce = function(arr, digit) {
    var bucket = creatBucket();
    for (var i = arr.length - 1; i >= 0; i--) {
      var flag = Math.floor(arr[i] / digit) % 10;
      bucket[flag].unshift(arr[i]);
    }
    return flatten(bucket);
  };

  for (var i = 1; i <= length; i++) {
    arr = radixOnce(arr, Math.pow(10, i - 1));
  }
  return arr;
};

// 桶排序
sort.bucket = function(arr, size) {
  size = size || 10;
  var max = getMaxNumber(arr);
  var min = getMinNumber(arr);
  //根据桶大小计算出桶的数量
  var bucketCount = Math.floor((max - min) / size) + 1;

  //初始化桶
  var buckets = new Array(bucketCount);
  for (var i = 0; i < bucketCount; i++) {
    buckets[i] = [];
  }

  //将每个待排序的数据放入对应的桶中
  for (var i = 0; i < arr.length; i++) {
    var flag = Math.floor((arr[i] - min) / size);
    buckets[flag].push(arr[i]);
  }

  //对每个桶进行插入排序
  for (var i = 0; i < bucketCount; i++) {
    buckets[i] = sort.insert(buckets[i]);
  }

  return flatten(buckets);
};

module.exports = sort;
