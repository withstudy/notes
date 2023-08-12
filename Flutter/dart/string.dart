void main(){
  // var声明
  var s1 = 'hello world';
  print(s1);
  // String声明
  String s2 = "Hello World";
  print(s2);
  // 三单引号： 支持换行符
  String s3 = '''hello
  dart''';
  print(s3);
  // 嵌入
  String s4 = '$s1 , $s2';
  print(s4);
  // 加运算
  print(s1 + s2);
  // 属性
  print("".isEmpty);
  // 查询
  print(s1.indexOf('w'));
  print(s1.lastIndexOf('l'));
  // 替换
  print(s1.replaceAll('world','flutter'));
  // 分割
  print(s1.split(' '));
  // 定义正则 
  var reg = RegExp(r'\d+');
  print(reg.hasMatch('hh123df'));
}