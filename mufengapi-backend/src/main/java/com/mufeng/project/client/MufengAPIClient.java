package com.mufeng.project.client;

import cn.hutool.core.util.RandomUtil;
import cn.hutool.http.Header;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.json.JSON;
import cn.hutool.json.JSONUtil;
import com.mufeng.model.entity.User;

import java.util.HashMap;
import java.util.Map;

/**
 * @author Mufeng
 */
public class MufengAPIClient {

    private static final String GATEWAY_HOST = "http://localhost:8090";
    private String userRequestParams;

    public MufengAPIClient(String userRequestParams) {
        this.userRequestParams = userRequestParams;
    }

    private Map<String, String> getHeaderMap(String userAccount) {
        Map<String, String> hashmap = new HashMap<>();
        hashmap.put("nonce", RandomUtil.randomNumbers(4));
        hashmap.put("timestamp", String.valueOf(System.currentTimeMillis() / 1000));
        hashmap.put("userAccount", userAccount);
        return hashmap;
    }
    private Map<String, String> getHeaderParams(String params,String userAccount) {
        Map<String, String> hashmap = new HashMap<>();
        hashmap.put("nonce", RandomUtil.randomNumbers(4));
        hashmap.put("timestamp", String.valueOf(System.currentTimeMillis() / 1000));
        hashmap.put("userAccount", userAccount);
        hashmap.put("params", params);
        return hashmap;
    }

    public String getUsernameByPost(User user) {
        String json = JSONUtil.toJsonStr(user);
        String userAccount = user.getUserAccount();
        HttpResponse httpResponse = HttpRequest.post(GATEWAY_HOST + "/api/name/user")
                .addHeaders(getHeaderMap(userAccount))
                .body(json)
                .execute();
        return httpResponse.body();
    }
    public String getRandomImage(String params,String userAccount){
        String json = JSONUtil.toJsonStr(params);
        HttpResponse httpResponse = HttpRequest.post(GATEWAY_HOST + "/api/interface/getRandomImage")
                .addHeaders(getHeaderParams(params,userAccount))
                .body(json)
                .execute();
        return httpResponse.header(Header.LOCATION);
    }
    public String getRandomWords(String params,String userAccount){
        String json = JSONUtil.toJsonStr(params);
        HttpResponse httpResponse = HttpRequest.post(GATEWAY_HOST + "/api/interface/getRandomWords")
                .addHeaders(getHeaderParams(params,userAccount))
                .body(json)
                .execute();
        return httpResponse.body();
    }
}
