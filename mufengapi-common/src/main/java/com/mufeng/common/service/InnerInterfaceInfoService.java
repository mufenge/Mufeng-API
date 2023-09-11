package com.mufeng.common.service;

import com.mufeng.common.model.entity.InterfaceInfo;

/**
* @author lenovo
* @description 针对表【interface_info(接口信息表)】的数据库操作Service
* @createDate 2023-08-04 13:50:24
*/
public interface InnerInterfaceInfoService{

    //查询接口信息
    InterfaceInfo getInvokeInterface(String path, String method);
}
