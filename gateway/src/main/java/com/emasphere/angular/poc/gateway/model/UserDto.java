package com.emasphere.angular.poc.gateway.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

import java.util.ArrayList;
import java.util.List;

import static java.util.Collections.*;

/**
 * @author Sebastien Gerard
 */
@JsonDeserialize(builder = UserDto.Builder.class)
public class UserDto {

    public static Builder userDto() {
        return new Builder();
    }

    private final String username;
    private final List<TenantDto> accessibleTenants;

    private UserDto(Builder builder) {
        username = builder.username;
        accessibleTenants = unmodifiableList(builder.accessibleTenants);
    }

    public String getUsername() {
        return username;
    }

    public List<TenantDto> getAccessibleTenants() {
        return accessibleTenants;
    }

    @JsonPOJOBuilder(withPrefix = "")
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static final class Builder {

        private String username;
        private final List<TenantDto> accessibleTenants = new ArrayList<>();

        private Builder() {
        }

        public Builder username(String username) {
            this.username = username;
            return this;
        }

        public Builder accessibleTenants(List<TenantDto> accessibleTenants) {
            this.accessibleTenants.addAll(accessibleTenants);
            return this;
        }

        public UserDto build() {
            return new UserDto(this);
        }
    }
}
