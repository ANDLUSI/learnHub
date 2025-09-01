package com.csi.utils;

import com.aliyun.dysmsapi20170525.Client;
import com.aliyun.dysmsapi20170525.models.SendSmsRequest;
import com.aliyun.dysmsapi20170525.models.SendSmsResponse;
import com.aliyun.teaopenapi.models.Config;

import java.util.Random;

import static com.aliyun.teautil.Common.toJSONString;

public class SmsUtils {

    private static final String KeyId = "KeyId";
    private static final String KeySecret = "KeySecret";
    private static final String endPoint = "dysmsapi.aliyuncs.com";
    private static final String signName = "学习集";
    private static final String tCode = "SMS_475780711";

    public static String sendSms(String phoneNumber) throws Exception {
        String code = generateVerificationCode();

        Config config = new Config()
                .setAccessKeyId(KeyId)
                .setAccessKeySecret(KeySecret)
                .setEndpoint(endPoint);

        Client client = new Client(config);

        SendSmsRequest sendSmsRequest = new SendSmsRequest()
                .setPhoneNumbers(phoneNumber)
                .setSignName(signName)
                .setTemplateCode(tCode)
                .setTemplateParam("{\"code\":\"" + code + "\"}");

        SendSmsResponse sendSmsResponse = client.sendSms(sendSmsRequest);

        String json = toJSONString(sendSmsResponse);

        return code;
    }

    private static String generateVerificationCode() {
        // 生成6位数字验证码
        Random random = new Random();
        int code = random.nextInt(1000000); // 随机生成 0 到 9999 的整数
        return String.format("%06d", code); // 保证生成的是6位数字，不足四位时前面补0
    }


    public static void main(String[] args) throws Exception {
        String string = sendSms("15078945846");
        System.out.println(string);
    }
}
