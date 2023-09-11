package com.mufeng.backend.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.mufeng.backend.mapper.ApplyMapper;
import com.mufeng.backend.model.dto.apply.ApplyInterfaceRequest;
import com.mufeng.backend.service.ApplyService;
import com.mufeng.common.model.entity.Apply;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
* @author lenovo
* @description 针对表【apply】的数据库操作Service实现
* @createDate 2023-09-09 11:11:55
*/
@Service
public class ApplyServiceImpl extends ServiceImpl<ApplyMapper, Apply>
    implements ApplyService {

    @Resource
    ApplyMapper applyMapper;
    @Override
    public boolean applyInterface(ApplyInterfaceRequest applyInterfaceRequest) {

        String userAccount = applyInterfaceRequest.getUserAccount();
        String name = applyInterfaceRequest.getName();
        String contact = applyInterfaceRequest.getContact();
        String address = applyInterfaceRequest.getAddress();
        String introduction = applyInterfaceRequest.getIntroduction();
        return applyMapper.applyInterface(userAccount,name,contact,address,introduction);
    }
}




