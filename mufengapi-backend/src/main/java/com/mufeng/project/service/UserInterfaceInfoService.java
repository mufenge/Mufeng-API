package com.mufeng.project.service;


import com.baomidou.mybatisplus.extension.service.IService;
import com.mufeng.model.entity.UserInterfaceInfo;

/**
* @author lenovo
* @description 针对表【user_interface_info(用户调用接口信息)】的数据库操作Service
* @createDate 2023-08-09 10:25:50
*/
public interface UserInterfaceInfoService extends IService<UserInterfaceInfo> {
    void validUserInterfaceInfo(UserInterfaceInfo userinterfaceInfo, boolean add);
    boolean invokeCount(long interfaceInfoId,long userId);
    boolean getInvokeUserInfo(long userId);
}
