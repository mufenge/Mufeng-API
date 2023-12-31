package com.mufeng.backend.service;



import com.baomidou.mybatisplus.extension.service.IService;
import com.mufeng.backend.model.vo.KeyVO;
import com.mufeng.common.model.entity.User;

import javax.servlet.http.HttpServletRequest;

/**
 * 用户服务
 *
 * @author mufeng
 */
public interface UserService extends IService<User> {

    /**
     * 用户账号注册
     *
     * @param userAccount   用户账户
     * @param userPassword  用户密码
     * @param checkPassword 校验密码
     * @return 新用户 id
     */
    long userRegister(String userAccount, String userPassword, String checkPassword);
    /**
     * 用户邮箱注册
     *
     * @param email   用户账户
     * @param userPassword  用户密码
     * @param checkPassword 校验密码
     * @return 新用户 id
     */
    long userEmailRegister(String email, String userPassword, String checkPassword);
    /**
     * 用户登录
     *
     * @param userAccount  用户账户
     * @param userPassword 用户密码
     * @param request
     * @return 脱敏后的用户信息
     */
    User userLogin(String userAccount, String userPassword, HttpServletRequest request);
    /**
     * 用户邮箱登录
     *
     * @param email  用户邮箱
     * @param request
     * @return 脱敏后的用户信息
     */
    User emailLogin(String email, HttpServletRequest request);
    /**
     * 获取当前登录用户
     *
     * @param request
     * @return
     */
    User getLoginUser(HttpServletRequest request);

    /**
     * 是否为管理员
     *
     * @param request
     * @return
     */
    boolean isAdmin(HttpServletRequest request);

    /**
     * 用户注销
     *
     * @param request
     * @return
     */
    boolean userLogout(HttpServletRequest request);
    /**
     * 用户修改密码
     *
     * @param userPassword
     * @return
     */
    boolean changeUserPwd(String userPassword, long userId);
    /**
     * 用户获取ak\sk
     *
     * @param userId
     * @return
     */
    KeyVO getKey(long userId);
}
