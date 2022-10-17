# mini-vue

* 创建vue实例
    * 1.将data中的数据挂载到vue实例上
    * 2.响应化data中的数据
        * 在每个属性的getter中创建dep实例收集依赖(watcher)，通过Dep.target
        * 在每个属性的setter中dep调用notify通知依赖修改
    * 3.编译模板，遍历模板中的每个节点，使用正则匹配插值表达式和指令，
      并将使用到的data的数据创建watcher收集到dep中
