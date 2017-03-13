# Sort.js
使用JS实现大多数的排序功能，方便学习各种排序

* 实现的排序
  * 冒泡排序(bubble)
  * 插入排序(insert)
  * 快速排序(quick)
  * 选择排序(selection)
  * 归并排序(merge)
  * 希尔排序(shell)
  * 堆排序(heap)
  * 基数排序(radix)
  * 桶排序(bucket)
  * 计数排序(counting)
  
### 使用

```
   var sort = require('sort.js');
   
   var arr = [2, 1, 3, 5, 6, 3, 1, 4];
   
   //使用冒泡排序
   var res = sort.bubble(arr);
```
  
对于所有的排序的介绍可以在wiki上找到实现的介绍，先了解介绍，再配合代码和代码的注释可以更好的了解

> 现在未对内存使用做很好的优化，如果对内存要求比较高的话，还是推荐使用c语言来实现

