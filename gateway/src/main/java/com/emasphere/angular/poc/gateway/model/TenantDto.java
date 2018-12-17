package com.emasphere.angular.poc.gateway.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

/**
 * @author Sebastien Gerard
 */
@JsonDeserialize(builder = TenantDto.Builder.class)
public class TenantDto {

    public static Builder tenantDto() {
        return new Builder();
    }

    private final String id;
    private final String name;

    private TenantDto(Builder builder) {
        id = builder.id;
        name = builder.name;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    @JsonPOJOBuilder(withPrefix = "")
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static final class Builder {

        private String id;
        private String name;

        private Builder() {
        }

        public Builder id(String id) {
            this.id = id;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public TenantDto build() {
            return new TenantDto(this);
        }
    }
}
