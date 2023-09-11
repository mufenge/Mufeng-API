package com.mufeng.backend.service.impl.inner;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.mufeng.backend.mapper.UserInterfaceInfoMapper;
import com.mufeng.backend.service.UserInterfaceInfoService;
import com.mufeng.common.service.InnerUserInterfaceInfoService;
import org.apache.dubbo.config.annotation.DubboService;

import javax.annotation.Resource;

/**
 * @author Mufeng
 */
@DubboService
public class InnerUserInterfaceInfoServiceImpl implements InnerUserInterfaceInfoService {
    @Resource
    private UserInterfaceInfoService userInterfaceInfoService;
    @Resource
    private UserInterfaceInfoMapper userInterfaceInfoMapper;
    @Override
    public boolean invokeCount(long interfaceInfoId, long userId) {
        return userInterfaceInfoService.invokeCount(interfaceInfoId,userId);
    }
    @Override
    public boolean getInvokeUserLeftNum(Long userId,Long interfaceInfoId) {
        return userInterfaceInfoService.getInvokeUserLeftNum(userId,interfaceInfoId);
    }
}
