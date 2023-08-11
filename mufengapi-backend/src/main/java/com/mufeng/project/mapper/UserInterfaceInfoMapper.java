package com.mufeng.project.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.mufeng.model.entity.UserInterfaceInfo;

import java.util.List;

/**
* @author lenovo
* @description 针对表【user_interface_info(用户调用接口信息)】的数据库操作Mapper
* @createDate 2023-08-09 10:25:50
* @Entity generator.domain.UserInterfaceInfo
*/
public interface UserInterfaceInfoMapper extends BaseMapper<UserInterfaceInfo> {

    List<UserInterfaceInfo> listTopInvoke(int limit);
}




