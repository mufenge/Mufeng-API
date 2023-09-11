package com.mufeng.backend.model.dto.user;

import lombok.Data;

import java.io.Serializable;

/**
 * 用户更新请求
 *
 * @author mufeng
 */
@Data
public class UserChangePwdRequest implements Serializable {
    /**
     * id
     */
    private Long id;

    /**
     * 密码
     */
    private String userPassword;

    /**
     * 校验密码
     */
    private String checkPassword;
    private static final long serialVersionUID = 1L;
}