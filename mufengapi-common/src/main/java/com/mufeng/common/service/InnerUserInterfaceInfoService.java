package com.mufeng.common.service;

public interface InnerUserInterfaceInfoService {
    //调用接口统计
    boolean invokeCount(long interfaceInfoId, long userId);
    boolean getInvokeUserLeftNum(Long userId,Long interfaceId);
}
