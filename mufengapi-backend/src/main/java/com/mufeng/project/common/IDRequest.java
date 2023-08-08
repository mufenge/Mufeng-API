
package com.mufeng.project.common;

import lombok.Data;

import java.io.Serializable;

/**
 * ID请求
 *
 * @author mufeng
 */
@Data
public class IDRequest implements Serializable {
    /**
     * id
     */
    private Long id;

    private static final long serialVersionUID = 1L;
}