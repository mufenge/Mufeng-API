package com.mufeng.project.model.dto.interfaceinfo;

import lombok.Data;

import java.io.Serializable;

/**
 * 更新请求
 *
 * @TableName product
 */
@Data
public class InterfaceInfoUpdateRequest implements Serializable {

    private Long id;

    /**
     * 用户名
     */
    private String name;
    /**
     * 请求参数
     */
    private String requestParams;
    /**
     * 描述
     */
    private String description;

    /**
     * 接口地址
     */
    private String url;

    /**
     * 请求头
     */
    private String requestHeader;

    /**
     * 响应头
     */
    private String responseHeader;

    /**
     * 接口状态（0 - 关闭， 1 - 开启））
     */
    private Integer status;

    /**
     * 请求类型
     */
    private String method;

}