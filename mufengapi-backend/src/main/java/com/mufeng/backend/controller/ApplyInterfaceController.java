package com.mufeng.backend.controller;

import com.mufeng.backend.model.dto.apply.ApplyInterfaceRequest;
import com.mufeng.backend.service.ApplyService;
import com.mufeng.common.BaseResponse;
import com.mufeng.common.utils.ResultUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * 申请接口
 * @author Mufeng
 */
@RestController
@RequestMapping("/apply")
public class ApplyInterfaceController {
    @Resource
    ApplyService applyService;
    @PostMapping
    public BaseResponse<Boolean> applyInterface(@RequestBody ApplyInterfaceRequest applyInterfaceRequest){
        boolean result = applyService.applyInterface(applyInterfaceRequest);
        return ResultUtils.success(result);
    }
}
