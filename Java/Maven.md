# Maven

Maven 是一个项目管理和构建工具，它使用项目对象模型（POM）来管理项目的构建、报告和文档。

## 生命周期

* `clean`：清理项目
* `compile`：构建项目
* `test`: 测试项目
* `package`：打包项目
* `install`：安装依赖
* `deploy`：部署项目

## 依赖范围

* `compile`：默认范围，编译、测试、运行都有效
* `provided`：编译、测试时有效，运行时无效
* `runtime`：测试、运行时有效，编译时无效
* `test`：测试时有效，编译、运行时无效
* `system`：编译、测试时有效，运行时无效，需要指定系统路径
* `import`：导入依赖范围，用于导入依赖的依赖

## 依赖原则

### 依赖特性

* `依赖传递`：A 依赖 B，B 依赖 C，则 A 也依赖 C
* `依赖冲突`：A 依赖 B，B 依赖 C，C 依赖 D，D 依赖 E，则 A 依赖 E，如果 E 有多个版本，则选择哪个版本

### 解决依赖冲突的原则

* ``最短路径优先原则``：选择依赖路径最短的依赖
* ``依赖先申明优先原则``：如果两个依赖路径长度相同，则选择先声明的依赖
* ``手动排除原则``：`exclusions` 标签可以排除依赖, `optinonal` 属性可以指定依赖是否可以传递

## 继承关系

是指一个项目从另一个项目中集成配置信息的机制

* 父工程

```xml
<packageing>pom</packageing>
<!-- 子工程自动继承 -->
<dependencies></dependencies>
<!-- 子工程需要自己选择要继承的依赖 -->
<dependencyManagement>
    <dependencies></dependencies>
</dependencyManagement>
```

* 子工程

```xml
<parent>
    <groupId>com.example</groupId>
    <artifactId>parent</artifactId>
    <version>1.0-SNAPSHOT</version>
</parent>
<!-- 管理依赖 -->
<dependencies>
    <dependency>
        <groupId>com.example</groupId>
        <artifactId>dependency</artifactId>
        <!-- dependencyManagement方式继承 -->
        <!-- 继承父工程的依赖，不需要写版本号 -->
    </dependency>
</dependencies>
```

## 聚合关系

将多个模块聚合在一起，统一构建

### 作用

* 将多个模块聚合在一起，统一构建，简化了部署和维护
* 统一管理模块的依赖，方便管理和维护
* 对多个项目进行顺序控制，避免依赖混乱导致构建失败 

```xml
<modules>
    <module>module1</module>
    <module>module2</module>
</modules>
```
