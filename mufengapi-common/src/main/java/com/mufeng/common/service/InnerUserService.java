package com.mufeng.common.service;

import com.mufeng.common.model.entity.User;

public interface InnerUserService {

    //查询用户密钥
    User getInvokeUser(String secret);

}
