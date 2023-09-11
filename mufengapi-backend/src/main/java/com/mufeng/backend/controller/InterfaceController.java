package com.mufeng.backend.controller;

import com.mufeng.backend.model.dto.interfaceinfo.InterfaceInfoInvokeRequest;
import com.mufeng.backend.service.InterfaceInfoService;
import com.mufeng.backend.service.UserService;
import com.mufeng.clientsdk.client.MufengAPIClient;
import com.mufeng.common.BaseResponse;
import com.mufeng.common.model.entity.User;
import com.mufeng.common.utils.ResultUtils;
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
     * @return
     */
    @PostMapping("/getRandomImage")
    public BaseResponse<String> invokeRandomImageInterface(@RequestBody InterfaceInfoInvokeRequest interfaceInfoInvokeRequest,HttpServletRequest request) {
        User loginuser = userService.getLoginUser(request);
        String accessKey = loginuser.getAccessKey();
        String secretKey = loginuser.getSecretKey();
        String userRequestParams = interfaceInfoInvokeRequest.getUserRequestParams();
        MufengAPIClient tempClient = new MufengAPIClient(accessKey,secretKey);
        String invokeResponse = tempClient.getRandomImage(userRequestParams);
        return ResultUtils.success(invokeResponse);
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
        User loginuser = userService.getLoginUser(request);
        String accessKey = loginuser.getAccessKey();
        String secretKey = loginuser.getSecretKey();
        String userRequestParams = interfaceInfoInvokeRequest.getUserRequestParams();
        MufengAPIClient tempClient = new MufengAPIClient(accessKey,secretKey);
        String invokeResponse = tempClient.getRandomWords(userRequestParams);
        return ResultUtils.success(invokeResponse);
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
        User loginuser = userService.getLoginUser(request);
        String accessKey = loginuser.getAccessKey();
        String secretKey = loginuser.getSecretKey();
        String userRequestParams = interfaceInfoInvokeRequest.getUserRequestParams();
        MufengAPIClient tempClient = new MufengAPIClient(accessKey,secretKey);
        String invokeResponse = tempClient.getQueryICP(userRequestParams);
        return ResultUtils.success(invokeResponse);
    }
    /**
     * 查询ICP接口调用
     *
     * @param interfaceInfoInvokeRequest
     * @param request
     * @return
     */
    @PostMapping("/getQueryDomain")
    public BaseResponse<String> invokeQueryDomainInterface(@RequestBody InterfaceInfoInvokeRequest interfaceInfoInvokeRequest,
                                                        HttpServletRequest request) {
        User loginuser = userService.getLoginUser(request);
        String accessKey = loginuser.getAccessKey();
        String secretKey = loginuser.getSecretKey();
        String userRequestParams = interfaceInfoInvokeRequest.getUserRequestParams();
        MufengAPIClient tempClient = new MufengAPIClient(accessKey,secretKey);
        String invokeResponse = tempClient.getQueryDomain(userRequestParams);
        return ResultUtils.success(invokeResponse);
    }
    /**
     * 历史今天接口调用
     *
     * @param interfaceInfoInvokeRequest
     * @param request
     * @return
     */
    @PostMapping("/getQueryHistory")
    public BaseResponse<String> invokeQueryHistoryInterface(@RequestBody InterfaceInfoInvokeRequest interfaceInfoInvokeRequest,
                                                           HttpServletRequest request) {
        User loginuser = userService.getLoginUser(request);
        String accessKey = loginuser.getAccessKey();
        String secretKey = loginuser.getSecretKey();
        String userRequestParams = interfaceInfoInvokeRequest.getUserRequestParams();
        MufengAPIClient tempClient = new MufengAPIClient(accessKey,secretKey);
        String invokeResponse = tempClient.getQueryHistory(userRequestParams);
        return ResultUtils.success(invokeResponse);
    }
    /**
     * 随机头像接口调用
     *
     * @param interfaceInfoInvokeRequest
     * @param request
     * @return
     */
    @PostMapping("/getRandomAvatar")
    public BaseResponse<String> invokeRandomAvatarInterface(@RequestBody InterfaceInfoInvokeRequest interfaceInfoInvokeRequest,
                                                            HttpServletRequest request) {
        User loginuser = userService.getLoginUser(request);
        String accessKey = loginuser.getAccessKey();
        String secretKey = loginuser.getSecretKey();
        String userRequestParams = interfaceInfoInvokeRequest.getUserRequestParams();
        MufengAPIClient tempClient = new MufengAPIClient(accessKey,secretKey);
        String invokeResponse = tempClient.getRandomAvatar(userRequestParams);
        return ResultUtils.success(invokeResponse);
    }
    /**
     * 随机表情接口调用
     *
     * @param interfaceInfoInvokeRequest
     * @param request
     * @return
     */
    @PostMapping("/getRandomCXK")
    public BaseResponse<String> invokeRandomCXKInterface(@RequestBody InterfaceInfoInvokeRequest interfaceInfoInvokeRequest,
                                                            HttpServletRequest request) {
        User loginuser = userService.getLoginUser(request);
        String accessKey = loginuser.getAccessKey();
        String secretKey = loginuser.getSecretKey();
        String userRequestParams = interfaceInfoInvokeRequest.getUserRequestParams();
        MufengAPIClient tempClient = new MufengAPIClient(accessKey,secretKey);
        String invokeResponse = tempClient.getRandomCXK(userRequestParams);
        return ResultUtils.success(invokeResponse);
    }
    /**
     * 垃圾分类接口调用
     *
     * @param interfaceInfoInvokeRequest
     * @param request
     * @return
     */
    @PostMapping("/getQueryRC")
    public BaseResponse<String> invokeQueryRCInterface(@RequestBody InterfaceInfoInvokeRequest interfaceInfoInvokeRequest,
                                                         HttpServletRequest request) {
        User loginuser = userService.getLoginUser(request);
        String accessKey = loginuser.getAccessKey();
        String secretKey = loginuser.getSecretKey();
        String userRequestParams = interfaceInfoInvokeRequest.getUserRequestParams();
        MufengAPIClient tempClient = new MufengAPIClient(accessKey,secretKey);
        String invokeResponse = tempClient.getQueryRC(userRequestParams);
        return ResultUtils.success(invokeResponse);
    }
}
