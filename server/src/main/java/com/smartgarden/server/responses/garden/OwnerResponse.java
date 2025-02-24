package com.smartgarden.server.responses.garden;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OwnerResponse {
    private Long id;
    private String username;
    private String email;

    public OwnerResponse(Long id, String username, String email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }
}
