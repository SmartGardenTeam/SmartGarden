package com.smartgarden.server.responses.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticatedUserResponse {
    private long id;
    private String username;

    public AuthenticatedUserResponse(long id, String username) {
        this.username = username;
        this.id = id;
    }
}