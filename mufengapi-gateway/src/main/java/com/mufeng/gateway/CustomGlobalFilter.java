package com.mufeng.gateway;


import com.mufeng.common.model.entity.InterfaceInfo;
import com.mufeng.common.model.entity.User;
import com.mufeng.common.service.InnerInterfaceInfoService;
import com.mufeng.common.service.InnerUserInterfaceInfoService;
import com.mufeng.common.service.InnerUserService;
import com.mufeng.common.utils.SignUtils;
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
    private static final String INTERFACE_HOST = "https://springboot-pq2n-67608-4-1320422627.sh.run.tcloudbase.com";

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        //1.请求日志
        ServerHttpRequest request = exchange.getRequest();
        ServerHttpResponse response = exchange.getResponse();
        String path = INTERFACE_HOST + request.getPath().value();
        String method = request.getMethod().toString();
        String queryParams = request.getQueryParams().toString();
        String remoteAddress = String.valueOf(request.getRemoteAddress());
        log.info("请求路径:" + path);
        log.info("请求方法:" + method);
        log.info("请求参数:" + queryParams);
        log.info("请求来源地址:" + remoteAddress);
        //2.用户鉴权
        //2.1校验ak，sk，随机数、时间戳,调用远程服务getInvokeUser：根据ak生成sk，根据sk找到对应的用户user
        HttpHeaders headers = request.getHeaders();
        String nonce = headers.getFirst("nonce");
        String timestamp = headers.getFirst("timestamp");
        String accessKey = headers.getFirst("accessKey");
        String body = headers.getFirst("body");
        log.info("请求参数:" + body);
        //校验ak，sk
        String secretKey = SignUtils.genSecretKey(accessKey);
        //根据sk找到对应的用户user
        User invokeUser = innerUserService.getInvokeUser(secretKey);
        if (invokeUser == null) {
            return handleUserNull(response);
        }
        log.info("API认证成功！");
        log.info("请求用户" + invokeUser.getUserAccount());
        //校验随机数
        if (Long.parseLong(nonce) > 10000L) {
            return handleNoAuth(response);
        }
        //校验时间戳，前后时间不超过5分钟
        long currentTime = System.currentTimeMillis() / 1000L;
        final long FIVE_MINUTES = 60 * 5L;
        if ((currentTime - Long.parseLong(timestamp)) >= FIVE_MINUTES) {
            return handleNoAuth(response);
        }
        //2.2校验接口是否存在及接口状态,调用远程服务getInvokeInterface，根据请求的地址和方法找到对应的接口interface
        InterfaceInfo invokedInterface = innerInterfaceInfoService.getInvokeInterface(path, method);
        if (invokedInterface == null || invokedInterface.getStatus() == 0) {
            return handleNoAuth(response);
        }
        //2.3校验剩余调用次数是否大于0,调用远程服务getInvokeUserLeftNum，根据用户id、interfaceId找到对应的记录查询
        boolean res = innerUserInterfaceInfoService.getInvokeUserLeftNum(invokeUser.getId(), invokedInterface.getId());
        log.info("res:"+res);
        if (!res) {
            return handleNoLeftNum(response);
        }
        boolean res2 = innerUserInterfaceInfoService.invokeCount(invokedInterface.getId(),invokeUser.getId());
        if (!res2) {
            return handleNoLeftNum(response);
        }
        //3.鉴权通过则发起请求到实际接口
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
    public Mono<Void> handleNoLeftNum(ServerHttpResponse response) {
        response.setStatusCode(HttpStatus.NO_CONTENT);
        return response.setComplete();
    }
    public Mono<Void> handleUserNull(ServerHttpResponse response) {
        response.setStatusCode(HttpStatus.BAD_REQUEST);
        return response.setComplete();
    }
    public Mono<Void> handleInvokeError(ServerHttpResponse response) {
        response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR);
        return response.setComplete();
    }

}