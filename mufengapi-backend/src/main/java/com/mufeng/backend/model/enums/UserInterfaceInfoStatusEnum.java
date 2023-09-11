package com.mufeng.backend.model.enums;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 用户接口状态枚举
 *
 * @author mufeng
 */
public enum UserInterfaceInfoStatusEnum {

    OFFLINE("正常", 0),
    ONLINE("禁用", 1);

    private final String text;

    private final int value;

    UserInterfaceInfoStatusEnum(String text, int value) {
        this.text = text;
        this.value = value;
    }

    /**
     * 获取值列表
     *
     * @return
     */
    public static List<Integer> getValues() {
        return Arrays.stream(values()).map(item -> item.value).collect(Collectors.toList());
    }

    public int getValue() {
        return value;
    }

    public String getText() {
        return text;
    }
}
