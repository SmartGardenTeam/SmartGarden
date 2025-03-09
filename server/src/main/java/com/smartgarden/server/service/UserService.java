package com.smartgarden.server.service;

import com.smartgarden.server.model.User;
import com.smartgarden.server.repository.UserRepository;
import com.smartgarden.server.responses.Response;
import com.smartgarden.server.responses.user.AuthenticatedUserResponse;
import com.smartgarden.server.responses.user.FindAllUsersResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.stream.StreamSupport;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Response<AuthenticatedUserResponse> authenticateUser() {
        Response<AuthenticatedUserResponse> response = new Response<>();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentuser = (User) authentication.getPrincipal();

        AuthenticatedUserResponse userResponse = new AuthenticatedUserResponse(currentuser.getId(), currentuser.getUsername());
        response.setData(userResponse);

        return response;
    }

    public Response<Iterable<FindAllUsersResponse>> findAllUsers() {
        Response<Iterable<FindAllUsersResponse>> response = new Response<>();

        Iterable<FindAllUsersResponse> users = StreamSupport.stream(userRepository.findAll().spliterator(), false)
                .map(user -> new FindAllUsersResponse(user.getId(), user.getUsername(), user.getEmail()))
                .collect(Collectors.toList());
        response.setData(users);

        return response;
    }
}