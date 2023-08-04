package com.mufeng.project.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.mufeng.project.model.entity.InterfaceInfo;

/**
* @author lenovo
* @description 针对表【interface_info(接口信息表)】的数据库操作Service
* @createDate 2023-08-04 13:50:24
*/
public interface InterfaceInfoService extends IService<InterfaceInfo> {

    void validInterfaceInfo(InterfaceInfo interfaceInfo,boolean add);

}
