package com.mufeng.project.client;

import cn.hutool.core.util.RandomUtil;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.json.JSONUtil;
import com.mufeng.model.entity.User;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author Mufeng
 */
public class MufengAPIClient {

    private static final String GATEWAY_HOST = "http://localhost:8090";
    private String accessKey;
    private String secretKey;

    public MufengAPIClient(String accessKey, String secretKey) {
        this.accessKey = accessKey;
        this.secretKey = secretKey;
    }

    private Map<String,String> getHeaderMap(String body){
        Map<String, String> hashmap = new HashMap<>();
        hashmap.put("nonce", RandomUtil.randomNumbers(4));
        hashmap.put("body",body);
        hashmap.put("timestamp",String.valueOf(System.currentTimeMillis()/1000));
        return hashmap;
    }

    public String getUsernameByPost(User user){
        String json = JSONUtil.toJsonStr(user);
        HttpResponse httpResponse = HttpRequest.post(GATEWAY_HOST+"/api/name/user")
                .addHeaders(getHeaderMap(json))
                .body(json)
                .execute();
        return httpResponse.body();
    }
}
