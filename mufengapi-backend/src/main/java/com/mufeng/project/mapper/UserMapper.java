package com.mufeng.project.mapper;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.mufeng.model.entity.User;

/**
 * @Entity com.mufeng.project.model.domain.User
 */
public interface UserMapper extends BaseMapper<User> {

    Boolean changeUserPwd(long userId,String userPassword);
}




