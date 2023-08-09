package com.mufeng.mufengapiclientsdk;

import com.mufeng.mufengapiclientsdk.client.MufengAPIClient;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * @author Mufeng
 */
@Configuration
@ConfigurationProperties("mufeng.client")
@Data
@ComponentScan
public class MufengapiClientConfig {
    private String accessKey;
    private String secretKey;

    @Bean
    public MufengAPIClient mufengAPIClient(){

        return new MufengAPIClient(accessKey,secretKey);
    }
}
