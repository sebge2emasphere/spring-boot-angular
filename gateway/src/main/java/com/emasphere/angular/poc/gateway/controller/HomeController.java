package com.emasphere.angular.poc.gateway.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/")
public class HomeController {

    @GetMapping
    public String home() {
        return "forward:/index.html";
    }

    @GetMapping("/app/*")
    public String app() {
        return "forward:/index.html";
    }

}