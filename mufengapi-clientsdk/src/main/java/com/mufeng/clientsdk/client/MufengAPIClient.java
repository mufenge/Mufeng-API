package com.mufeng.clientsdk.client;

import cn.hutool.core.util.RandomUtil;
import cn.hutool.http.Header;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.json.JSONUtil;

import java.util.HashMap;
import java.util.Map;

/**
 * @author Mufeng
 */
public class MufengAPIClient {

    private static final String GATEWAY_HOST = "http://localhost:8002";
    private String accesskey;
    private String secretKey;

    public MufengAPIClient(String accesskey,String secretKey) {
        this.accesskey = accesskey;
        this.secretKey = secretKey;
    }

    private Map<String, String> getHeaderParams(String body) {
        Map<String, String> hashmap = new HashMap<>();
        hashmap.put("nonce", RandomUtil.randomNumbers(4));
        hashmap.put("timestamp", String.valueOf(System.currentTimeMillis() / 1000));
        hashmap.put("accessKey",accesskey);
        hashmap.put("body",body);
        return hashmap;
    }
    public String getRandomImage(String params){
        String json = JSONUtil.toJsonStr(params);
        HttpResponse httpResponse = HttpRequest.post(GATEWAY_HOST + "/api/interface/getRandomImage")
                .addHeaders(getHeaderParams(params))
                .body(json)
                .execute();
        return httpResponse.header(Header.LOCATION);
    }
    public String getRandomWords(String params){
        String json = JSONUtil.toJsonStr(params);
        HttpResponse httpResponse = HttpRequest.post(GATEWAY_HOST + "/api/interface/getRandomWords")
                .addHeaders(getHeaderParams(params))
                .body(json)
                .execute();
        return httpResponse.body();
    }
    public String getQueryICP(String params){
        String json = JSONUtil.toJsonStr(params);
        HttpResponse httpResponse = HttpRequest.post(GATEWAY_HOST + "/api/interface/getQueryICP")
                .addHeaders(getHeaderParams(params))
                .body(json)
                .execute();
        return httpResponse.body();
    }
    public String getQueryDomain(String params){
        String json = JSONUtil.toJsonStr(params);
        HttpResponse httpResponse = HttpRequest.post(GATEWAY_HOST + "/api/interface/getQueryDomain")
                .addHeaders(getHeaderParams(params))
                .body(json)
                .execute();
        return httpResponse.body();
    }
    public String getQueryHistory(String params){
        String json = JSONUtil.toJsonStr(params);
        HttpResponse httpResponse = HttpRequest.post(GATEWAY_HOST + "/api/interface/getQueryHistory")
                .addHeaders(getHeaderParams(params))
                .body(json)
                .execute();
        return httpResponse.body();
    }
    public String getRandomAvatar(String params){
        String json = JSONUtil.toJsonStr(params);
        HttpResponse httpResponse = HttpRequest.post(GATEWAY_HOST + "/api/interface/getRandomAvatar")
                .addHeaders(getHeaderParams(params))
                .body(json)
                .execute();
        return httpResponse.body();
    }
    public String getRandomCXK(String params){
        String json = JSONUtil.toJsonStr(params);
        HttpResponse httpResponse = HttpRequest.post(GATEWAY_HOST + "/api/interface/getRandomCXK")
                .addHeaders(getHeaderParams(params))
                .body(json)
                .execute();
        return httpResponse.body();
    }
    public String getQueryRC(String params){
        String json = JSONUtil.toJsonStr(params);
        HttpResponse httpResponse = HttpRequest.post(GATEWAY_HOST + "/api/interface/getQueryRC")
                .addHeaders(getHeaderParams(params))
                .body(json)
                .execute();
        return httpResponse.body();
    }
}
