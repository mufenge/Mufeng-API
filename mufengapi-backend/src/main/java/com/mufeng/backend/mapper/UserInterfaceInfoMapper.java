package com.mufeng.backend.mapper;



import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.mufeng.common.model.entity.UserInterfaceInfo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
* @author lenovo
* @description 针对表【user_interface_info(用户调用接口信息)】的数据库操作Mapper
* @createDate 2023-08-09 10:25:50
* @Entity generator.domain.UserInterfaceInfo
*/
public interface UserInterfaceInfoMapper extends BaseMapper<UserInterfaceInfo> {

    List<UserInterfaceInfo> listTopInvoke(int limit);
    List<UserInterfaceInfo> getUserInvokeInfo(long userId);
    Boolean insertNum(@Param("userId") long userId,@Param("interfaceInfoId") long interfaceInfoId,@Param("interfaceInfoName") String interfaceInfoName);
    Boolean invokeCount(long userId,long interfaceInfoId);
    int getInvokeUserLeftNum(@Param("userId") long userId,@Param("interfaceInfoId") long interfaceInfoId);
}




