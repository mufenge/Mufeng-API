package com.mufeng.project;

import com.mufeng.project.provider.DemoService;
import org.apache.dubbo.config.annotation.DubboReference;
import org.apache.dubbo.config.spring.context.annotation.EnableDubbo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
@EnableDubbo
public class MufengapiGatewayApplication {

    @DubboReference
    private DemoService demoService;

    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(MufengapiGatewayApplication.class, args);
        MufengapiGatewayApplication application = context.getBean(MufengapiGatewayApplication.class);
        String result = application.doSayHello("mufeng");
        System.out.println(result);
    }

    public String doSayHello(String name) {
        return demoService.sayHello(name);
    }

}
