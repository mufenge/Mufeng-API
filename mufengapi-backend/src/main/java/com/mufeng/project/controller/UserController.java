package com.mufeng.project.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.plugins.pagination.PageDTO;
import com.mufeng.model.entity.User;
import com.mufeng.project.annotation.AuthCheck;
import com.mufeng.project.annotation.ExcludeInterceptor;
import com.mufeng.project.common.BaseResponse;
import com.mufeng.project.common.DeleteRequest;
import com.mufeng.project.common.ErrorCode;
import com.mufeng.project.common.ResultUtils;
import com.mufeng.project.exception.BusinessException;
import com.mufeng.project.model.dto.user.*;
import com.mufeng.project.model.vo.UserVO;
import com.mufeng.project.service.UserService;
import com.sun.xml.internal.messaging.saaj.packaging.mime.MessagingException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;
import org.springframework.mail.javamail.JavaMailSender;

import javax.annotation.Resource;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 用户接口
 *
 * @author mufeng
 */
@RestController
@RequestMapping("/user")
public class UserController {

    final String from = "2216391020@qq.com";
    @Resource
    JavaMailSender javaMailSender;
    @Resource
    private UserService userService;

    // region 登录相关

    /**
     * 用户注册
     *
     * @param userRegisterRequest
     * @return
     */
    @PostMapping("/register")
    @ExcludeInterceptor
    public BaseResponse<Long> userRegister(@RequestBody UserRegisterRequest userRegisterRequest) {
        if (userRegisterRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String userAccount = userRegisterRequest.getUserAccount();
        String userPassword = userRegisterRequest.getUserPassword();
        String checkPassword = userRegisterRequest.getCheckPassword();
        if (StringUtils.isAnyBlank(userAccount, userPassword, checkPassword)) {
            return null;
        }
        long result = userService.userRegister(userAccount, userPassword, checkPassword);
        return ResultUtils.success(result);
    }

    /**
     * 用户邮箱注册
     *
     * @param userEmailRegisterRequest
     * @return
     */
    @PostMapping("/emailRegister")
    @ExcludeInterceptor
    public BaseResponse<Long> userEmailRegister(@RequestBody UserEmailRegisterRequest userEmailRegisterRequest, HttpSession session) {
        if (userEmailRegisterRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String email = userEmailRegisterRequest.getEmail();
        Integer code = userEmailRegisterRequest.getCode();
        String userPassword = userEmailRegisterRequest.getUserPassword();
        String checkPassword = userEmailRegisterRequest.getCheckPassword();
        if (StringUtils.isAnyBlank(email, userPassword, checkPassword)) {
            return null;
        }
        String code1 = (String) session.getAttribute("code");
        String email1 = (String) session.getAttribute("email");
        if (!email1.equals(email)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        if (!code1.equals(code)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        long result = userService.userEmailRegister(email, userPassword, checkPassword);
        return ResultUtils.success(result);
    }

    /**
     * 用户邮箱注册
     *
     * @param
     * @return
     */
    @GetMapping("/sendEmail")
    @ExcludeInterceptor
    public Boolean sendMail() {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            //设置发件人
            mimeMessageHelper.setFrom(from);
            String email = "19572216227@163.com";
            //设置收件人
            mimeMessageHelper.setTo(email);
            //设置邮件主题
            mimeMessageHelper.setSubject("邮箱登录验证");
            //生成随机数
            String random = randomInteger();

            //将随机数放置到session中
            //设置验证码的样式
            mimeMessageHelper.setText("<font >" + random + "</font>", true);
            javaMailSender.send(mimeMessage);

        } catch (javax.mail.MessagingException e) {
            throw new RuntimeException(e);
        }
        return true;
    }

    //生成随机数
    public String randomInteger() {
        String random = "";
        for (int i = 0; i < 6; i++) {
            random += (int) (Math.random() * 10);
        }
        return random.toString();
    }

    /**
     * 更新用户密码
     *
     * @param request
     * @return
     */
    @PostMapping("/changePassword")
    public BaseResponse<Boolean> changeUserPwd(@RequestBody UserChangePwdRequest userChangePwdRequest, HttpServletRequest request) {
        if (userChangePwdRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User loginuser = userService.getLoginUser(request);
        long userId = loginuser.getId();
        String userPassword = userChangePwdRequest.getUserPassword();
        boolean result = userService.changeUserPwd(userPassword, userId);
        return ResultUtils.success(result);
    }

    /**
     * 用户登录
     *
     * @param userLoginRequest
     * @param request
     * @return
     */
    @PostMapping("/login")
    public BaseResponse<User> userLogin(@RequestBody UserLoginRequest userLoginRequest, HttpServletRequest request) {
        if (userLoginRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String userAccount = userLoginRequest.getUserAccount();
        String userPassword = userLoginRequest.getUserPassword();
        if (StringUtils.isAnyBlank(userAccount, userPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User user = userService.userLogin(userAccount, userPassword, request);
        return ResultUtils.success(user);
    }

    /**
     * 用户注销
     *
     * @param request
     * @return
     */
    @PostMapping("/logout")
    public BaseResponse<Boolean> userLogout(HttpServletRequest request) {
        if (request == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = userService.userLogout(request);
        return ResultUtils.success(result);
    }

    /**
     * 获取当前登录用户
     *
     * @param request
     * @return
     */
    @GetMapping("/get/login")
    public BaseResponse<UserVO> getLoginUser(HttpServletRequest request) {
        User user = userService.getLoginUser(request);
        UserVO userVO = new UserVO();
        BeanUtils.copyProperties(user, userVO);
        return ResultUtils.success(userVO);
    }

    // endregion

    // region 增删改查

    /**
     * 创建用户
     *
     * @param userAddRequest
     * @param request
     * @return
     */
    @PostMapping("/add")
    @AuthCheck(mustRole = "admin")
    public BaseResponse<Long> addUser(@RequestBody UserAddRequest userAddRequest, HttpServletRequest request) {
        if (userAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User user = new User();
        BeanUtils.copyProperties(userAddRequest, user);
        boolean result = userService.save(user);
        if (!result) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR);
        }
        return ResultUtils.success(user.getId());
    }

    /**
     * 删除用户
     *
     * @param deleteRequest
     * @param request
     * @return
     */
    @PostMapping("/delete")
    @AuthCheck(mustRole = "admin")
    public BaseResponse<Boolean> deleteUser(@RequestBody DeleteRequest deleteRequest, HttpServletRequest request) {
        if (deleteRequest == null || deleteRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean b = userService.removeById(deleteRequest.getId());
        return ResultUtils.success(b);
    }

    /**
     * 更新用户
     *
     * @param userUpdateRequest
     * @param request
     * @return
     */
    @PostMapping("/update")
    @AuthCheck(mustRole = "admin")
    public BaseResponse<Boolean> updateUser(@RequestBody UserUpdateRequest userUpdateRequest, HttpServletRequest request) {
        if (userUpdateRequest == null || userUpdateRequest.getId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User user = new User();
        BeanUtils.copyProperties(userUpdateRequest, user);
        boolean result = userService.updateById(user);
        return ResultUtils.success(result);
    }

    /**
     * 根据 id 获取用户
     *
     * @param request
     * @return
     */
    @GetMapping("/get")
    public BaseResponse<UserVO> getUserById(HttpServletRequest request) {
        User loginuser = userService.getLoginUser(request);
        long id = loginuser.getId();
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User user = userService.getById(id);
        UserVO userVO = new UserVO();
        BeanUtils.copyProperties(user, userVO);
        return ResultUtils.success(userVO);
    }

    /**
     * 获取用户列表
     *
     * @param userQueryRequest
     * @param request
     * @return
     */
    @GetMapping("/list")
    @AuthCheck(mustRole = "admin")
    public BaseResponse<List<UserVO>> listUser(UserQueryRequest userQueryRequest, HttpServletRequest request) {
        User userQuery = new User();
        if (userQueryRequest != null) {
            BeanUtils.copyProperties(userQueryRequest, userQuery);
        }
        QueryWrapper<User> queryWrapper = new QueryWrapper<>(userQuery);
        List<User> userList = userService.list(queryWrapper);
        List<UserVO> userVOList = userList.stream().map(user -> {
            UserVO userVO = new UserVO();
            BeanUtils.copyProperties(user, userVO);
            return userVO;
        }).collect(Collectors.toList());
        return ResultUtils.success(userVOList);
    }

    /**
     * 分页获取用户列表
     *
     * @param userQueryRequest
     * @param request
     * @return
     */
    @GetMapping("/list/page")
    @AuthCheck(mustRole = "admin")
    public BaseResponse<Page<UserVO>> listUserByPage(UserQueryRequest userQueryRequest, HttpServletRequest request) {
        long current = 1;
        long size = 10;
        User userQuery = new User();
        if (userQueryRequest != null) {
            BeanUtils.copyProperties(userQueryRequest, userQuery);
            current = userQueryRequest.getCurrent();
            size = userQueryRequest.getPageSize();
        }
        QueryWrapper<User> queryWrapper = new QueryWrapper<>(userQuery);
        Page<User> userPage = userService.page(new Page<>(current, size), queryWrapper);
        Page<UserVO> userVOPage = new PageDTO<>(userPage.getCurrent(), userPage.getSize(), userPage.getTotal());
        List<UserVO> userVOList = userPage.getRecords().stream().map(user -> {
            UserVO userVO = new UserVO();
            BeanUtils.copyProperties(user, userVO);
            return userVO;
        }).collect(Collectors.toList());
        userVOPage.setRecords(userVOList);
        return ResultUtils.success(userVOPage);
    }

    // endregion
}
