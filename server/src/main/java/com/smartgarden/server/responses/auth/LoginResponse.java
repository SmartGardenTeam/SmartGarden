package com.smartgarden.server.responses.auth;

import com.smartgarden.server.responses.user.UserResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LoginResponse {
    private AuthenticationResponse authenticationResponse;
    private UserResponse userResponse;

    public LoginResponse(AuthenticationResponse authenticationResponse, UserResponse userResponse) {
        this.authenticationResponse = authenticationResponse;
        this.userResponse = userResponse;
    }
}