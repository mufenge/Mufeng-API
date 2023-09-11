package com.mufeng.backend.mapper;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.mufeng.common.model.entity.Apply;
import org.apache.ibatis.annotations.Param;

/**
* @author lenovo
* @description 针对表【apply】的数据库操作Mapper
* @createDate 2023-09-09 11:11:55
* @Entity generator.domain.Apply
*/
public interface ApplyMapper extends BaseMapper<Apply> {

    boolean applyInterface(@Param("userAccount")String userAccount,@Param("name") String name,@Param("contact") String contact, @Param("address") String address,@Param("introduction") String introduction);
}




