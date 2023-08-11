package com.mufeng.project.model.vo;

import com.mufeng.model.entity.InterfaceInfo;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 *接口信息封装
 *
 * @author mufeng
 * @TableName product
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class InterfaceInfoVO extends InterfaceInfo{

    private Integer totalNum;

    private static final long serialVersionUID = 1L;
}
