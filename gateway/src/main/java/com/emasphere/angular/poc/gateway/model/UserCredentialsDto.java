package com.emasphere.angular.poc.gateway.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

/**
 * @author Sebastien Gerard
 */
@JsonDeserialize(builder = UserCredentialsDto.Builder.class)
public class UserCredentialsDto {

    public static Builder userCredentialsDto() {
        return new Builder();
    }

    private final String username;
    private final String password;

    private UserCredentialsDto(Builder builder) {
        username = builder.username;
        password = builder.password;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    @JsonPOJOBuilder(withPrefix = "")
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static final class Builder {
        private String username;
        private String password;

        private Builder() {
        }

        public Builder username(String username) {
            this.username = username;
            return this;
        }

        public Builder password(String password) {
            this.password = password;
            return this;
        }

        public UserCredentialsDto build() {
            return new UserCredentialsDto(this);
        }
    }
}
