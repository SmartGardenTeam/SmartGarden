package com.smartgarden.server.responses;

import lombok.Getter;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class Response<T> {
    private T data;
    private Boolean success;
    private List<String> errors;

    public Response() {
        success = true;
        errors = new ArrayList<>();
    }
}