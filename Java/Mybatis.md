# MyBatis

## 什么是Mybatis？

Mybatis 是一款优秀的持久层框架，它支持定制化 SQL、存储过程以及高级映射。MyBatis 避免了几乎所有的 JDBC 代码和手动设置参数以及获取结果集。MyBatis 可以使用简单的 XML 或注解来配置和映射原生类型、接口和 Java 的 POJO（Plain Old Java Objects，普通老式 Java 对象）为数据库中的记录。

## 使用

1. 导入依赖

```xml
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.7</version>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.28</version>
</dependency>
```

2. 编写配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <properties resource="jdbc.properties"></properties>

    <settings>
      <!-- 开启下划线变为驼峰 -->
      <setting name="mapUnderscoreToCamelCase" value="true" />
    </settings>

    <!-- 实体类别名 -->
    <typeAliases>
        <!-- <typeAliase type="com.xhb.xhb.pojo.User" alias="User" /> -->
        <!-- 批量定义别名 -->
        <package name="com.xhb.pojo" />
    </typeAliases>

  <environments default="development">
    <environment id="development">
      <transactionManager type="JDBC"/>
      <dataSource type="POOLED">
        <property name="driver" value="${jdbc.driver}"/>
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
      </dataSource>
    </environment>
  </environments>
 
  <mappers>
    <!-- 注册 mapper 文件 -->
    <!-- <mapper resource="mappers/UserMapper.xml"/> -->
    <!-- 
        以包为单位，将指定包下的所有 mapper 接口进行注册
        注意：必须满足以下要求
        1. mapper 接口所在的包必须和 mapper 映射文件所在的包一致
        2. mapper 接口名称和 mapper 映射文件名称必须一致
     -->
    <package name="com.xhb.mapper" />
  </mappers>
</configuration>
```

3. 编写映射文件Mapper

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.xhb.mapper.UserMapper">
    <select id="queryAllUsers" resultType="User">
        select * from t_user
    </select>
    <!-- 多个参数 -->
    <!-- User queryUserByIdName(int id, String name); -->
    <select id="queryUserByIdName" resultType="User">
        <!-- select * from t_user where id = #{arg0} and name = #{arg1} -->
        <!-- select * from t_user where id = #{param1} and name = #{param2} -->
        select * from t_user where id = ${arg0} and name = '${arg1}'
    </select>

    <!-- 参数是map 可以直接用key取值  -->
    <!-- User queryUserByIdNameMap(Map<String, Object> map); -->
    <select id="queryUserByIdNameMap" resultType="User">
        select * from t_user where id = #{id} and name = #{name}
    </select>

    <!-- 参数是对象 可以直接属性名取值 -->
    <!-- int insertUser(User user); -->
    <insert id="insertUser">
        insert into t_user values(null, #{name}, #{blance})
    </insert>

    <!-- 注解方式 -->
    <!-- User queryUserByIdNameParam(@Param("id") int id, @Param("name") String name); -->
    <select id="queryUserByIdNameParam" resultType="User">
        select * from t_user where id = ${id} and name = '${name}'
    </select>

    <!-- 查询为map -->
    <!-- Map<String, Object> queryUserByIdToMap(int id); -->
    <select id="queryUserByIdToMap" resultType="Map">
        select * from t_user where id = #{id}
    </select>

    <!-- 多条数据 -->
    <!-- List<Map<String, Object>> queryAllUserToMap(); -->
    <select id="queryAllUserToMap" resultType="Map">
        select * from t_user
    </select>

    <!-- @MapKey("id")  -->
    <!-- Map<String, Object> queryAllUserToMapByKey(); -->
    <select id="queryAllUserToMapByKey" resultType="Map">
        select * from t_user
    </select>

    <!-- 模糊查询 -->
    <!-- List<User> queryUserByBlurName(@Param("name") String name); -->
    <select id="queryUserByBlurName" resultType="User">
        <!-- select * from t_user where name like '%${name}%' -->
        <!-- select * from t_user where name like concat('%', #{name}, '%') -->
        select * from t_user where name like "%"#{name}"%"
    </select>

    <!-- 批量删除 -->
    <!-- int batchDeleteUser(@Param("ids") String ids); -->
    <delete id="batchDeleteUser">
        delete from t_user where id in (${ids})
    </delete>
</mapper>
```

### 映射文件Mapper

1. 传值方式

* 单个参数：直接使用
* 多个参数：使用@Param注解
* map：使用key取值
* 对象：使用属性名取值

2. 多对一查询

* 使用resultType：不能正确封装，因为查询结果集有多条，但只能封装一个对象
* 使用resultMap：可以正确封装，但需要自定义resultMap

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.xhb.mapper.EmpMapper">

    <resultMap id="empResultType" type="Emp">
        <id property="eid" column="eid"/>
        <result property="empName" column="emp_name"/>
        <result property="sex" column="sex"/>
        <result property="age" column="age"/>
        <!-- <result property="dept.did" column="did"/>
        <result property="dept.deptName" column="dept_name"/> -->
        <association property="dept" javaType="Dept">
            <id property="did" column="did"/>
            <result property="deptName" column="dept_name"/>
        </association>
    </resultMap>

    <resultMap id="empStepResultMap" type="Emp">
        <id property="eid" column="eid"/>
        <result property="empName" column="emp_name"/>
        <result property="sex" column="sex"/>
        <result property="age" column="age"/>
        <association property="dept" column="did" select="com.xhb.mapper.DeptMapper.findDeptById">
        </association>
    </resultMap>

    <!-- List<Emp> findAllEmp(); --> 
    <select id="findAllEmp" resultMap="empResultType">
        select * from emp left join dept on emp.did = dept.did
    </select>

    <!-- 分步查询 -->
    <!-- List<Emp> findAllEmpStep(); -->
    <select id="findAllEmpStep" resultMap="empStepResultMap">
        select * from emp
    </select>
</mapper>
```

1. 一对多查询

* 使用resultType：不能正确封装，因为查询结果集有多条，但只能封装一个对象
* 使用resultMap：可以正确封装，但需要自定义resultMap

4. 动态SQL

* if：判断条件
* choose：选择条件
* trim：去除前缀或后缀
* where：添加where条件
* set：添加set条件

## 延迟加载

作用：按需加载，先从单表查询，需要时再从关联表查询，以提升效率

1. 开启延迟加载

```xml
<settings>
    <setting name="lazyLoadingEnabled" value="true"/>
    <setting name="aggressiveLazyLoading" value="false"/>
</settings>
```

2. 配置延迟加载

```xml
<resultMap id="empStepResultMap" type="Emp">
    <id property="eid" column="eid"/>
    <result property="empName" column="emp_name"/>
    <result property="sex" column="sex"/>
    <result property="age" column="age"/>
    <association property="dept" column="did" select="com.xhb.mapper.DeptMapper.findDeptById" fetchType="lazy">
    </association>
</resultMap>
```
