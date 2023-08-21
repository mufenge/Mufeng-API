package com.mufeng.project.model.dto.user;

import lombok.Data;

import java.io.Serializable;

/**
 * 用户注册请求体
 *
 * @author mufeng
 */
@Data
public class UserEmailRegisterRequest implements Serializable {

    private static final long serialVersionUID = 3191241716373120793L;
    private String email;
    private String code;

}
