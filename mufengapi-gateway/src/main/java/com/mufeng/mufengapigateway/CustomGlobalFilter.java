package com.mufeng.mufengapigateway;

import lombok.extern.slf4j.Slf4j;
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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.fasterxml.jackson.databind.cfg.CoercionInputShape.Array;

/**
 * 全局过滤器
 *
 * @author Mufeng
 */
@Slf4j
@Component
public class CustomGlobalFilter implements GlobalFilter, Ordered {

    private static final List<String> IP_WHITE_LIST = Arrays.asList("127.0..0.1");

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        //实现业务逻辑
        //1.请求日志
        ServerHttpRequest request = exchange.getRequest();
        log.info("请求唯一标识:" + request.getId());
        log.info("请求路径:" + request.getPath().value());
        log.info("请求方法:" + request.getMethod());
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
        //实际情况根据数据库查询
        if (!accessKey.equals("mufeng")) {
            return handleNoAuth(response);
        }
        if (Long.parseLong(nonce) > 10000L) {
            return handleNoAuth(response);
        }
        Long currentTime = System.currentTimeMillis() / 1000L;
        Long FIVE_MINUTES = 60*5L;
        if ((currentTime - Long.parseLong(timestamp)) >= FIVE_MINUTES ){
            return handleNoAuth(response);
        }


        String serversign = SignUtils.getSign(body, "abcdefgh");
        String result = "Interface: " + user.getUsername();

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
}