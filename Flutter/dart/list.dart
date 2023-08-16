void main() {
  List l = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // 追加
  l.add(11);
  print(l);
  List l2 = <String>['1', '2', '3'];
  // 指定位置添加
  l2.insert(3, '4');
  print(l2);
  // 使用构造函数的list是固定长度，growable=true，任意长度
  var l3 = new List.empty(growable: true);
  l3.add(1);
  print(l3);
  // 填充
  var l4 = new List.filled(4, 10);
  print(l4);
  // 扩展运算符
  List l5 = [11, ...l4];
  // 删除指定元素
  l5.remove(11);
  print(l5);
  // 遍历 forEach
  l.forEach((i) => print(i));
  // 遍历 map 返回的是一个可叠戴对象，toList方法可以转为list
  var l6 = l2.map((i) => i).toList();
  print(l6);
  // any 一项满足条件就为true
  bool l7 = l4.any((i) => i == 11);
  print(l7);
  // every 所有项满足才为true
  bool l8 = l5.every((i) => i == 10);
  print(l8);
}
