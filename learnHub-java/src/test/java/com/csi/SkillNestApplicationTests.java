package com.csi;

import com.csi.utils.SmsUtils;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SkillNestApplicationTests {

    @Test
    void contextLoads() throws Exception {

        SmsUtils.sendSms("15078945846");
    }

}
