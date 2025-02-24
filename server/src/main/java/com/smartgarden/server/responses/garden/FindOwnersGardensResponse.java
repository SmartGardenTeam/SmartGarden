package com.smartgarden.server.responses.garden;

import com.smartgarden.server.model.User;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class FindOwnersGardensResponse {
    private long id;
    private String name;
    private String location;
    private OwnerResponse owner;
    private LocalDateTime creationDate;

    public FindOwnersGardensResponse(long id, String name, String location, OwnerResponse owner, LocalDateTime creationDate) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.owner = owner;
        this.creationDate = creationDate;
    }
}
