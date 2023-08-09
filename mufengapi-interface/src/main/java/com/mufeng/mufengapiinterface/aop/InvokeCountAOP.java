package com.mufeng.mufengapiinterface.aop;

import org.aopalliance.intercept.Joinpoint;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 调用次数切面
 * @author Mufeng
 */
@RestControllerAdvice
public class InvokeCountAOP {
    public void doInvokeCount(Joinpoint joinpoint){
        //调用成功，次数加一

    }

}
