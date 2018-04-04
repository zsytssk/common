## zsySlider

* 图片左右切换 支持点击 pagination, 滑动 左右切换

* dom 结构

![dom 结构](https://raw.githubusercontent.com/zsytssk/common/master/laya/util/zsySlider_dom.png "dom 结构")

* js 代码

```javascript
var help_glr = new zsySlider(help_glr, {
  origin_index: 0, // 初始显示的index
  animate_time: 500, // 动画执行时间
  item_space: 10, // item 之间的距离
  pagination: true, // boolean
  end_call_back: null // 移动
});

help_glr.prev(); // 向前划
help_glr.next(); // 向后划
```

## zutil

* getChildenByName 获取匹配名称的子集
* getElementsByName 获取匹配名称的子孙集合
* getChildenByType 获取匹配类型的子集
* getElementsByType 获取匹配类型的子孙集合
* getElementsByProperty 获取匹配属性的子孙集合
* getElementsByProperty 获取匹配属性的子孙集合
* ...


## animate
* 常见的动画函数
* fade_in | fade_out ...