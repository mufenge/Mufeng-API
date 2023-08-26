package com.mufeng.project;

import com.mufeng.model.entity.InterfaceInfo;
import com.mufeng.model.entity.User;
import com.mufeng.service.InnerInterfaceInfoService;
import com.mufeng.service.InnerUserInterfaceInfoService;
import com.mufeng.service.InnerUserService;
import com.mufeng.utils.SignUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.dubbo.config.annotation.DubboReference;
import org.apache.dubbo.config.spring.context.annotation.EnableDubbo;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;


/**
 * 全局过滤器
 *
 * @author Mufeng
 */
@Slf4j
@Component
@EnableDubbo
public class CustomGlobalFilter implements GlobalFilter, Ordered {

    @DubboReference
    private InnerUserService innerUserService;
    @DubboReference
    private InnerInterfaceInfoService innerInterfaceInfoService;
    @DubboReference
    private InnerUserInterfaceInfoService innerUserInterfaceInfoService;
    private static final String INTERFACE_HOST = "https://springboot-pq2n-67608-4-1320422627.sh.run.tcloudbase.com:7529";
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        //1.请求日志
        ServerHttpRequest request = exchange.getRequest();
        String path = INTERFACE_HOST + request.getPath().value();
        String method = request.getMethod().toString();
        log.info("请求路径:" + path);
        log.info("请求方法:" + method);
        log.info("请求参数:" + request.getQueryParams());
        log.info("请求来源地址:" + request.getRemoteAddress());
        ServerHttpResponse response = exchange.getResponse();
        //2.黑白名单
        //3.用户鉴权
        HttpHeaders headers = request.getHeaders();
        String nonce = headers.getFirst("nonce");
        String timestamp = headers.getFirst("timestamp");
        String userAccount = headers.getFirst("userAccount");
        String params = headers.getFirst("params");
        log.info("请求参数:" + params);
        User invokeUser = null;
        try {
            invokeUser = innerUserService.getInvokeUser(userAccount);
        } catch (Exception e) {
            log.error("getError");
        }
        if (invokeUser == null) {
            return handleNoAuth(response);
        }
        log.info("请求用户" + userAccount);
        //设置超时时间5分钟
        if (Long.parseLong(nonce) > 10000L) {
            return handleNoAuth(response);
        }
        Long currentTime = System.currentTimeMillis() / 1000L;
        final Long FIVE_MINUTES = 60 * 5L;
        if ((currentTime - Long.parseLong(timestamp)) >= FIVE_MINUTES) {
            return handleNoAuth(response);
        }
        //API签名认证
        String invokeUserAccount = invokeUser.getUserAccount();
        String invokeAccessKey = invokeUser.getAccessKey();
        String invokeSecretKey = invokeUser.getSecretKey();
        String serverAccessKey = SignUtils.genAccessKey(invokeUserAccount);
        String serverSecretKey = SignUtils.genSecretKey(invokeUserAccount);
        if (!invokeAccessKey.equals(serverAccessKey)||!invokeSecretKey.equals(serverSecretKey)) {
            return handleNoAuth(response);
        }
        log.info("API认证成功！");
        //4.判断请求接口信息
        InterfaceInfo interfaceInfo = null;
        try {
            interfaceInfo = innerInterfaceInfoService.getInterfaceInfo(path, method);
        } catch (Exception e) {
            log.error("getError");
        }

        if (interfaceInfo == null) {
            return handleNoAuth(response);
        }
        //5.判断是否调用成功，invokeCount，输出响应日志；调用失败，返回规范错误码
        Boolean res = innerUserInterfaceInfoService.invokeCount(interfaceInfo.getId(), invokeUser.getId());
        if (!res){
            log.info("次数不足");
            return handleNoAuth(response);
        }

        if (response.getStatusCode() == HttpStatus.OK) {
            log.info("调用成功，响应结果：" + response.getStatusCode());
        } else {
            return handleInvokeError(response);
        }
        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return -1;
    }

    public Mono<Void> handleNoAuth(ServerHttpResponse response) {
        response.setStatusCode(HttpStatus.FORBIDDEN);
        return response.setComplete();
    }

    public Mono<Void> handleInvokeError(ServerHttpResponse response) {
        response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR);
        return response.setComplete();
    }

}