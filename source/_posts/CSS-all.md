---
title: CSS-总结
date: 2022-04-15 11:32:20
categories: CSS
tags: [CSS]
description: 学习总结
cover: https://s2.loli.net/2022/04/15/EPRcslrZ5LCYQyB.jpg
---

# CSS-总结

## 1、盒子模型

**盒模型**分为内容（content）、填充（padding）、边界（margin）、边框（border）四个部分

**盒模型**分为IE盒模型（border-box）、W3C标准盒模型（content-box）：

* `IE盒模型`：属性width，height包含content、border和padding，指的是content
  +padding+border。
  
* `W3C标准盒模型`：属性width，height只包含内容content，不包含border和padding

可以通过修改元素的`box-sizing`属性来改变元素的盒模型。

## 2、选择器

常见的选择器有：

* id选择器（#myid）
* 类选择器（.myclassname）
* 标签选择器（div,h1,p）
* 后代选择器（h1 p）
* 相邻后代选择器（子）选择器（ul>li）
* 兄弟选择器（li~a）
* 相邻兄弟选择器（li+a）
* 属性选择器（a[rel="external"]）
* 伪类选择器（a:hover,li:nth-child）
* 伪元素选择器（::before、::after）
* 通配符选择器（*）

## 3、优先级

CSS的优先级是根据样式声明的特殊性值来判断的。

优先级依次为：

1. `!important`：优先级最高
2. `行内样式`：记作`1000`
3. `id选择器`：记作`100`
4. `类、属性、伪类选择器`：记作`10`
5. `伪元素、元素选择器`：记作`1`

计算规则：

**规则中每出现一个选择器，就将它的特殊性进行叠加，这个叠加只限于对应的等
级的叠加，不会产生进位。选择器特殊性值的比较是从左向右排序的，也就是说以1开头的特殊性值比所有以0开头的特殊性值要大。
比如说特殊性值为1000的的规则优先级就要比特殊性值为0999的规则高。如果两个规则的特殊性值相等的时候，那么就会根据它们引
入的顺序，后出现的规则的优先级最高。**

## 4、伪类与伪元素

**伪类和伪元素是用来修饰不在文档树中的部分**，比如，一句 话中的第一个字母，或者是列表中的第一个元素。

* **伪类** 用于当已有的元素处于某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，当用户悬停在指定的
元素时，我们可以通过:hover来描述这个元素的状态。
  
* **伪元素** 用于创建一些不在文档树中的元素，并为其添加样式。它们允许我们为元素的某些部分设置样式。比如说，我们可以通过::be
  fore来在一个元素前增加一些文本，并为这些文本添加样式。

单冒号（:）用于CSS3伪类，双冒号（::）用于CSS3伪元素。（伪元素由双冒号和伪元素名称组成）

不过浏览器需要同时支持旧的已经存在的伪元素写法， 比如:first-line、:first-letter、:before、:after等

## 5、BFC

**块格式化上下文**（Block Formatting Context，BFC）是Web页面的可视化CSS渲染的一部分，是布局过程中生成块级盒
子的区域，也是浮动元素与其他元素的交互限定区域。

特点：
* BFC是一个独立的布局环境，可以理解为一个容器，在这个容器中按照一定规则进行物品摆放，并且不会影响其它环境中的物品。
* 如果一个元素符合触发BFC的条件，则BFC中的元素布局不受外部影响。

创建条件:
* 根元素或包含根元素的元素
* 浮动元素`float!=none`的元素
* 绝对定位元素`position = absolute|fixed`
* `display=inline-block|flex|inine-flex|table-cell或table-caption`
* `overflow!=visible`

## 6、继承性

在 CSS 中有一个很重要的特性就是子元素会继承父元素对应属性计算后的值。

可继承的属性有：

* 字体相关：font-family、font-style、font-size、font-weight 等；
* 文本相关：text-align、text-indent、text-decoration、text-shadow、letter-spacing、word-spacing、white-space、line-height、color 等；
* 列表相关：list-style、list-style-image、list-style-type、list-style-position 等；
* 其他属性：visibility、cursor 等；


## 7、层叠上下文

在电脑显示屏幕上的显示的页面其实是一个三维的空间，水平方向是 X 轴，竖直方向是 Y 轴，而屏幕到眼睛的方向可以看成是 Z 轴。众 HTML 元素依据自己定义的属性的优先级在 Z 轴上按照一定的顺序排开，而这其实就是层叠上下文所要描述的东西。

产生层叠上下文：
* html 文档根元素
* 声明 position: absolute/relative 且 z-index 值不为 auto 的元素；
* 声明 position: fixed/sticky 的元素；
* flex 容器的子元素，且 z-index 值不为 auto；
* grid 容器的子元素，且 z-index 值不为 auto；
* opacity 属性值小于 1 的元素；
* mix-blend-mode 属性值不为 normal 的元素；
* 以下任意属性值不为 none 的元素：
    * transform
    * filter
    * perspective
    * clip-path
    * mask / mask-image / mask-border
* isolation 属性值为 isolate 的元素；
* -webkit-overflow-scrolling 属性值为 touch 的元素；
* will-change 值设定了任一属性而该属性在 non-initial 值时会创建层叠上下文的元素；
* contain 属性值为 layout、paint 或包含它们其中之一的合成值（比如 contain: strict、contain: content）的元素。
  
#### 层叠顺序

![](https://s2.loli.net/2022/04/15/1VK8anWoUEJCbPR.png)

## 8、CSS3新特性

* 新增各种CSS选择器  （:not(.input)：所有class不是“input”的节点）
* 圆角    （border-radius:8px）
* 多列布局  （multi-column layout）
* 阴影和反射  （ShadowReflect）
* 文字特效    （text-shadow）
* 文字渲染    （Text-decoration）
* 线性渐变    （gradient）
* 旋转      （transform）
* 缩放，定位，倾斜，动画，多背景

## 9、Flex box（弹性盒布局模型）

Flex是FlexibleBox的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

采用Flex布局的元素，称为Flex容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为Flex
项目（flex item），简称"项目"。

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis），项目默认沿主轴排列。

常用属性：

以下6个属性设置在容器上

* flex-direction属性决定主轴的方向（即项目的排列方向）。
* flex-wrap属性定义，如果一条轴线排不下，如何换行。
* flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。
* justify-content属性定义了项目在主轴上的对齐方式。
* align-items属性定义项目在交叉轴上如何对齐。
* align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

以下6个属性设置在项目上

* order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
* flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
* flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
* flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间。浏览器根据这个属性，计算主轴是否有多余空间。它的默认
值为auto，即项目的本来大小。
* flex属性是flex-grow，flex-shrink和flex-basis的简写，默认值为0 1 auto。
* align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父
元素的align-items属性，如果没有父元素，则等同于stretch。
  
## 10、值和单位

CSS 的声明是由属性和值组成的，而值的类型有许多种：

* 数值：长度值 ，用于指定例如元素 width、border-width、font-size 等属性的值；
* 百分比：可以用于指定尺寸或长度，例如取决于父容器的 width、height 或默认的 font-size；
* 颜色：用于指定 background-color、color 等；
* 坐标位置：以屏幕的左上角为坐标原点定位元素的位置，比如常见的 background-position、top、right、bottom 和 left 等属性；
* 函数：用于指定资源路径或背景图片的渐变，比如 url()、linear-gradient() 等；

**单位**

前置知识：

1. 设备像素（Device pixels）

设备屏幕的物理像素，表示的是屏幕的横纵有多少像素点；和屏幕分辨率是差不多的意思

2. 设备像素比（DPR）

设备像素比表示 1 个 CSS 像素等于几个物理像素。

计算公式：DPR = 物理像素数 / 逻辑像素数；

在浏览器中可以通过 window.devicePixelRatio 来获取当前屏幕的 DPR。

* px

px 表示的是 CSS 中的像素，在 CSS 中它是绝对的长度单位，也是最基础的单位，其他长度单位会自动被浏览器换算成 px。

但是对于设备而言，它其实又是相对的长度单位，比如宽高都为 2px，在正常的屏幕下，其实就是 4 个像素点，而在设备像素比(devicePixelRatio) 为 2 的 Retina 屏幕下，它就有 16 个像素点。所以屏幕尺寸一致的情况下，屏幕分辨率越高，显示效果就越细腻。

* em

em 是 CSS 中的相对长度单位中的一个。居然是相对的，那它到底是相对的谁呢？它有 2 层意思：

> 在 font-size 中使用是相对于父元素的 font-size 大小，比如父元素 font-size: 16px，当给子元素指定 font-size: 2em 的时候，经过计算后它的字体大小会是 32px；
>
> 在其他属性中使用是相对于自身的字体大小，如 width/height/padding/margin 等；

* rem

rem(root em) 和 em 一样，也是一个相对长度单位，不过 rem 相对的是 HTML 的根元素 html。

* vw/vh

vw 和 vh 分别是相对于屏幕视口宽度和高度而言的长度单位：

1vw = 视口宽度均分成 100 份中 1 份的长度；
1vh = 视口高度均分成 100 份中 1 份的长度；

在 JS 中 100vw = window.innerWidth，100vh = window.innerHeight。
