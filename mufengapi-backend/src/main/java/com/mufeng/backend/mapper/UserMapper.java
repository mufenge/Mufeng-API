package com.mufeng.backend.mapper;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.mufeng.backend.model.vo.KeyVO;
import com.mufeng.common.model.entity.User;
import org.apache.ibatis.annotations.Param;

/**
 * @Entity com.mufeng.project.model.domain.User
 */
public interface UserMapper extends BaseMapper<User> {

    Boolean changeUserPwd(@Param("userId") long userId, @Param("userPassword") String userPassword);
    KeyVO getKey(@Param("userId") long userId);
}




