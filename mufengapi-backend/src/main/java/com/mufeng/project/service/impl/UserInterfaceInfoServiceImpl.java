package com.mufeng.project.service.impl;

import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import com.mufeng.model.entity.UserInterfaceInfo;
import com.mufeng.project.common.ErrorCode;
import com.mufeng.project.exception.BusinessException;
import com.mufeng.project.mapper.UserInterfaceInfoMapper;
import com.mufeng.project.service.UserInterfaceInfoService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
* @author lenovo
* @description 针对表【user_interface_info(用户调用接口信息)】的数据库操作Service实现
* @createDate 2023-08-09 10:25:50
*/
@Service
public class UserInterfaceInfoServiceImpl extends ServiceImpl<UserInterfaceInfoMapper, UserInterfaceInfo>
    implements UserInterfaceInfoService {
    @Resource
    UserInterfaceInfoMapper userInterfaceInfoMapper;
    @Override
    public void validUserInterfaceInfo(UserInterfaceInfo userInterfaceInfo, boolean add) {
        if (userInterfaceInfo == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }

        Long id = userInterfaceInfo.getId();
        Long userId = userInterfaceInfo.getUserId();
        Long interfaceInfoId = userInterfaceInfo.getInterfaceInfoId();
        Integer status = userInterfaceInfo.getStatus();
        Integer totalNum = userInterfaceInfo.getTotalNum();
        Integer leftNum = userInterfaceInfo.getLeftNum();

        // 创建时，所有参数必须非空
        if (add) {
            if (id<=0||userId<=0) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR,"接口或用户不存在");
            }
        }
        if (status==1) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户已被禁用");
        }
    }

    @Override
    public boolean invokeCount(long interfaceInfoId, long userId) {
        //判断
        if(interfaceInfoId<=0||userId<=0){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        UpdateWrapper<UserInterfaceInfo> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("interfaceInfoId",interfaceInfoId);
        updateWrapper.eq("userId",userId);
        updateWrapper.gt("leftNum",0);
        updateWrapper.setSql("leftNum = leftNum -1, totalNum = totalNum + 1");
        long count = userInterfaceInfoMapper.selectCount(updateWrapper);
        if (count==0){
            return false;
        }else {
            boolean update = this.update(updateWrapper);
            return update;
        }
    }

}




