package com.mufeng.common.utils;

import cn.hutool.crypto.digest.DigestAlgorithm;
import cn.hutool.crypto.digest.Digester;
import org.springframework.util.DigestUtils;

/**
 * 密钥生成工具
 * @author Mufeng
 */
public class SignUtils {
    private static final String SALT_AK = "miku";

    public static String genAccessKey(String a) {
        return DigestUtils.md5DigestAsHex((a + SALT_AK).getBytes());
    }

    public static String genSecretKey(String accessKey) {
        Digester md5 = new Digester(DigestAlgorithm.SHA256);
        return md5.digestHex(accessKey);
    }
}
