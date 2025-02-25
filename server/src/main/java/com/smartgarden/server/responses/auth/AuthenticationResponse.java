package com.smartgarden.server.responses.auth;

import lombok.*;

@Getter
@Setter
@Builder
public class AuthenticationResponse {
    private String jwtAccessToken;
    private String jwtRefreshToken;

    public AuthenticationResponse(String jwtAccessToken, String jwtRefreshToken) {
        this.jwtAccessToken = jwtAccessToken;
        this.jwtRefreshToken = jwtRefreshToken;
    }
}