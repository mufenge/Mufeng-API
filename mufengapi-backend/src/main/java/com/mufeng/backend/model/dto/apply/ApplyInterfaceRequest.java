package com.mufeng.backend.model.dto.apply;

import lombok.Data;

import java.io.Serializable;

/**
 * 
 * 接口申请表
 */
@Data
public class ApplyInterfaceRequest implements Serializable {

    /**
     * 
     */
    private String userAccount;

    /**
     * 
     */
    private String name;

    /**
     * 
     */
    private String contact;

    /**
     * 
     */
    private String address;

    /**
     * 
     */
    private String introduction;
}