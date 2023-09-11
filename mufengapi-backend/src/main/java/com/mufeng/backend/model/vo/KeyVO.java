package com.mufeng.backend.model.vo;

import lombok.Data;

import java.io.Serializable;

/**
 * 用户AKSK
 *
 * @TableName user
 */
@Data
public class KeyVO implements Serializable {

    /**
     * accessKey
     */
    private String accessKey;

    /**
     * secretKey
     */
    private String secretKey;

}