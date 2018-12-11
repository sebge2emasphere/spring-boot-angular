package com.emasphere.angular.poc.gateway.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import static java.util.Collections.*;

@RestController
@RequestMapping("/api")
public class ServiceController {

    @RequestMapping(method = RequestMethod.GET, path = "/my-service")
    public Object test() {
        return singletonMap("message", "Hello World!");
    }
}