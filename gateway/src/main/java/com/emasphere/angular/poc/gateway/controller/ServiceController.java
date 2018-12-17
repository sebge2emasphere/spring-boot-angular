package com.emasphere.angular.poc.gateway.controller;

import com.emasphere.angular.poc.gateway.model.UserCredentialsDto;
import com.emasphere.angular.poc.gateway.model.UserDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

import static com.emasphere.angular.poc.gateway.model.TenantDto.*;
import static com.emasphere.angular.poc.gateway.model.UserDto.*;
import static java.util.Arrays.*;
import static java.util.Collections.*;

@RestController
@RequestMapping("/my-service")
public class ServiceController {

    @RequestMapping(method = RequestMethod.GET, path = "/message")
    public Object test() {
        return singletonMap("message", "Hello World!");
    }

    @RequestMapping(method = RequestMethod.POST, path = "/authenticate")
    public ResponseEntity<UserDto> authenticate(@RequestBody UserCredentialsDto credentials) {
        if (!Objects.equals("1happydev", credentials.getPassword())) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        if (Objects.equals("consolidation@emasphere.com", credentials.getUsername())) {
            return new ResponseEntity<>(
                    userDto()
                            .username("consolidation@emasphere.com")
                            .accessibleTenants(
                                    asList(
                                            tenantDto()
                                                    .id("83abd0b5-88b2-4457-8c9c-ef8ed6f3c867")
                                                    .name("Consolidation")
                                                    .build(),
                                            tenantDto()
                                                    .id("da2097a8-6188-45ae-89db-1c3e10fe4514")
                                                    .name("Consolidated")
                                                    .build()
                                    )
                            )
                            .build(),
                    HttpStatus.OK
            );
        } else if (Objects.equals("consolidated@emasphere.com", credentials.getUsername())) {
            return new ResponseEntity<>(
                    userDto()
                            .username("consolidated@emasphere.com")
                            .accessibleTenants(
                                    asList(
                                            tenantDto()
                                                    .id("da2097a8-6188-45ae-89db-1c3e10fe4514")
                                                    .name("Consolidated")
                                                    .build()
                                    )
                            )
                            .build(),
                    HttpStatus.OK
            );
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}