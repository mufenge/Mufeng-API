package com.mufeng.project.model.dto.interfaceInfo;

import com.baomidou.mybatisplus.annotation.TableField;

import lombok.Data;

import java.io.Serializable;


/**
 * 更新请求
 *
 * @author <a href="https://github.com/liyupi">程序员鱼皮</a>
 * @from <a href="https://yupi.icu">编程导航知识星球</a>
 */
@Data
public class InterfaceInfoUpdateRequest implements Serializable {

    /**
     * id
     */
    private Long id;
    private String name;

    /**
     *
     */
    private String description;

    /**
     *
     */
    private String url;

    /**
     *
     */
    private String request_header;

    /**
     *
     */
    private String response_header;

    /**
     *
     */


    /**
     *
     */
    private Integer status;

    /**
     *
     */
    private String method;

    /**
     *
     */
    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}