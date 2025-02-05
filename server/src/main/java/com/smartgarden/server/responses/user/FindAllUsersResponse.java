package com.smartgarden.server.responses.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FindAllUsersResponse {
    private long id;
    private String username;
    private String email;

    public FindAllUsersResponse(long id, String username, String email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }
}