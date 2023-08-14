package com.mufeng.project.controller;

import com.mufeng.model.entity.InterfaceInfo;
import com.mufeng.model.entity.User;
import com.mufeng.project.client.MufengAPIClient;
import com.mufeng.project.common.BaseResponse;
import com.mufeng.project.common.ErrorCode;
import com.mufeng.project.common.ResultUtils;
import com.mufeng.project.exception.BusinessException;
import com.mufeng.project.model.dto.interfaceinfo.InterfaceInfoInvokeRequest;
import com.mufeng.project.model.enums.InterfaceInfoStatusEnum;
import com.mufeng.project.service.InterfaceInfoService;
import com.mufeng.project.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * 前端调用接口
 * @author Mufeng
 */

@RestController
@RequestMapping("/interface")
public class InterfaceController {

    @Resource
    private InterfaceInfoService interfaceInfoService;

    @Resource
    private UserService userService;
    /**
     * 随机图片接口调用
     *
     * @param interfaceInfoInvokeRequest
     * @param request
     * @return
     */
    @PostMapping("/getRandomImage")
    public BaseResponse<String> invokeCommonInterface(@RequestBody InterfaceInfoInvokeRequest interfaceInfoInvokeRequest,
                                                      HttpServletRequest request) {

        if (interfaceInfoInvokeRequest == null || interfaceInfoInvokeRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        long id = interfaceInfoInvokeRequest.getId();

        // 判断是否存在
        InterfaceInfo oldInterfaceInfo = interfaceInfoService.getById(id);
        if (oldInterfaceInfo == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        if (oldInterfaceInfo.getStatus() == InterfaceInfoStatusEnum.OFFLINE.getValue()) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "接口已经关闭");
        }
        User loginuser = userService.getLoginUser(request);
        String userRequestParams = interfaceInfoInvokeRequest.getUserRequestParams();
        MufengAPIClient tempClient = new MufengAPIClient(userRequestParams);
        String invokeCommonInterface = tempClient.getRandomImage(userRequestParams,loginuser.getUserAccount());
        return ResultUtils.success(invokeCommonInterface);
    }
    /**
     * 随机一句话接口调用
     *
     * @param interfaceInfoInvokeRequest
     * @param request
     * @return
     */
    @PostMapping("/getRandomWords")
    public BaseResponse<String> invokeRandomWordsInterface(@RequestBody InterfaceInfoInvokeRequest interfaceInfoInvokeRequest,
                                                      HttpServletRequest request) {

        if (interfaceInfoInvokeRequest == null || interfaceInfoInvokeRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        long id = interfaceInfoInvokeRequest.getId();

        // 判断是否存在
        InterfaceInfo oldInterfaceInfo = interfaceInfoService.getById(id);
        if (oldInterfaceInfo == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        if (oldInterfaceInfo.getStatus() == InterfaceInfoStatusEnum.OFFLINE.getValue()) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "接口已经关闭");
        }
        User loginuser = userService.getLoginUser(request);
        String userRequestParams = interfaceInfoInvokeRequest.getUserRequestParams();
        MufengAPIClient tempClient = new MufengAPIClient(userRequestParams);
        String invokeCommonInterface = tempClient.getRandomWords(userRequestParams,loginuser.getUserAccount());
        return ResultUtils.success(invokeCommonInterface);
    }
    /**
     * 查询ICP接口调用
     *
     * @param interfaceInfoInvokeRequest
     * @param request
     * @return
     */
    @PostMapping("/getQueryICP")
    public BaseResponse<String> invokeQueryICPInterface(@RequestBody InterfaceInfoInvokeRequest interfaceInfoInvokeRequest,
                                                           HttpServletRequest request) {

        if (interfaceInfoInvokeRequest == null || interfaceInfoInvokeRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        long id = interfaceInfoInvokeRequest.getId();

        // 判断是否存在
        InterfaceInfo oldInterfaceInfo = interfaceInfoService.getById(id);
        if (oldInterfaceInfo == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        if (oldInterfaceInfo.getStatus() == InterfaceInfoStatusEnum.OFFLINE.getValue()) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "接口已经关闭");
        }
        User loginuser = userService.getLoginUser(request);
        String userRequestParams = interfaceInfoInvokeRequest.getUserRequestParams();
        MufengAPIClient tempClient = new MufengAPIClient(userRequestParams);
        String invokeCommonInterface = tempClient.getQueryICP(userRequestParams,loginuser.getUserAccount());
        return ResultUtils.success(invokeCommonInterface);
    }
}
