package com.mufeng.project.service.impl.inner;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.mufeng.model.entity.User;
import com.mufeng.project.common.ErrorCode;
import com.mufeng.project.exception.BusinessException;
import com.mufeng.project.mapper.UserMapper;
import com.mufeng.service.InnerUserService;
import org.apache.commons.lang3.StringUtils;
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
    public User getInvokeUser(String accessKey, String secretKey) {
        if(StringUtils.isAnyBlank(accessKey,secretKey)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("accessKey",accessKey);
        queryWrapper.eq("secretKey",secretKey);
        return userMapper.selectOne(queryWrapper);
    }
}
