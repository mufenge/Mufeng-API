package com.mufeng.backend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.mufeng.backend.model.dto.apply.ApplyInterfaceRequest;
import com.mufeng.common.model.entity.Apply;


/**
* @author lenovo
* @description 针对表【apply】的数据库操作Service
* @createDate 2023-09-09 11:11:55
*/
public interface ApplyService extends IService<Apply> {

    public boolean applyInterface(ApplyInterfaceRequest applyInterfaceRequest);
}
