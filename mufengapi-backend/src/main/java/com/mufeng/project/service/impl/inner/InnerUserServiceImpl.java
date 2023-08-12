package com.mufeng.project.service.impl.inner;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.mufeng.model.entity.User;
import com.mufeng.project.mapper.UserMapper;
import com.mufeng.service.InnerUserService;
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
    public User getInvokeUser(String userAccount) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userAccount",userAccount);
        return userMapper.selectOne(queryWrapper);
    }

}
