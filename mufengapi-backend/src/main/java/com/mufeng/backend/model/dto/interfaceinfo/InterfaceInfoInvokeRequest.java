package com.mufeng.backend.model.dto.interfaceinfo;

import lombok.Data;

import java.io.Serializable;

/**
 * 接口调用
 *
 * @TableName product
 */
@Data
public class InterfaceInfoInvokeRequest implements Serializable {

    private Long id;

    /**
     * 请求参数
     */
    private String userRequestParams;

}