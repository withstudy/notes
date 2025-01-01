package com.xhb.anno.bean;

import org.springframework.stereotype.Component;

import com.xhb.anno.custom.NotHaveBlank;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @NotNull(message = "用户名不能为空")
    private String name;
    @Min(value = 0, message = "年龄不能小于0岁")
    private Integer age;

    @NotHaveBlank
    private String description;
}
