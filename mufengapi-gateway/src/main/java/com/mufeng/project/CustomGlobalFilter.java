package com.mufeng.project;

import com.mufeng.model.entity.InterfaceInfo;
import com.mufeng.model.entity.User;
import com.mufeng.mufengapiclientsdk.utils.SignUtils;
import com.mufeng.service.InnerInterfaceInfoService;
import com.mufeng.service.InnerUserInterfaceInfoService;
import com.mufeng.service.InnerUserService;
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

import java.util.Arrays;
import java.util.List;

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
    private static final List<String> IP_WHITE_LIST = Arrays.asList("127.0.0.1");

    private static final String INTERFACE_HOST = "http://localhost:8123";
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        //实现业务逻辑

        //1.请求日志
        ServerHttpRequest request = exchange.getRequest();
        String path =  INTERFACE_HOST + request.getPath().value();
        String method = request.getMethod().toString();
        log.info("请求唯一标识:" + request.getId());
        log.info("请求路径:" + path);
        log.info("请求方法:" + method);
        log.info("请求参数:" + request.getQueryParams());
        log.info("请求来源地址:" + request.getRemoteAddress());
        String address = request.getLocalAddress().getHostString();
        log.info("请求来源地址:" + request.getLocalAddress().getHostString());
        ServerHttpResponse response = exchange.getResponse();
        //2.黑白名单
        if (!IP_WHITE_LIST.contains(address)) {
            return handleNoAuth(response);
        }
        //3.用户鉴权
        HttpHeaders headers = request.getHeaders();
        String accessKey = headers.getFirst("accessKey");
        String nonce = headers.getFirst("nonce");
        String timestamp = headers.getFirst("timestamp");
        String sign = headers.getFirst("sign");
        String body = headers.getFirst("body");
        User invokeUser = null;
        try {
            invokeUser = innerUserService.getInvokeUser(accessKey);
        } catch (Exception e) {
            log.error("getError");
        }
        if (invokeUser == null) {
            return handleNoAuth(response);
        }
        //超时时间5分钟
        if (Long.parseLong(nonce) > 10000L) {
            return handleNoAuth(response);
        }
        Long currentTime = System.currentTimeMillis() / 1000L;
        final Long FIVE_MINUTES = 60 * 5L;
        if ((currentTime - Long.parseLong(timestamp)) >= FIVE_MINUTES) {
            return handleNoAuth(response);
        }
        String secretKey = invokeUser.getSecretKey();
        String serverSign = SignUtils.getSign(accessKey, secretKey);
        if (sign == null || !sign.equals(serverSign)) {
            return handleNoAuth(response);
        }
        //4.判断请求接口信息
        InterfaceInfo interfaceInfo = null;
        try {
            interfaceInfo = innerInterfaceInfoService.getInterfaceInfo(path,method);
        } catch (Exception e) {
            log.error("getError");
        }
        if (interfaceInfo == null) {
            return handleNoAuth(response);
        }


        //6.调用成功，invokeCount；调用失败，返回规范错误码
        if (response.getStatusCode() == HttpStatus.OK) {
            innerUserInterfaceInfoService.invokeCount(interfaceInfo.getId(),invokeUser.getId());
            log.info("响应结果：" + response.getStatusCode());
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