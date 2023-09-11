package com.mufeng.backend.service.impl.inner;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;

import com.mufeng.backend.mapper.UserMapper;
import com.mufeng.common.model.entity.User;
import com.mufeng.common.service.InnerUserService;
import org.apache.dubbo.config.annotation.DubboService;

import javax.annotation.Resource;

/**
 * @author Mufeng
 */
@DubboService
public class InnerUserServiceImpl implements InnerUserService {
    @Resource
    private UserMapper userMapper;
    @Override
    public User getInvokeUser(String secretKey) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("secretKey",secretKey);
        return userMapper.selectOne(queryWrapper);
    }

}
