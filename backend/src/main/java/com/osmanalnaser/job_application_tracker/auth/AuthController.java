package com.osmanalnaser.job_application_tracker.auth;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/register")
    public void register(@Valid @RequestBody RegisterRequest request) {
        authService.register(request);
    }

    @PostMapping("/login")
    public String login() {
        return "LOGIN WORKS";
    }


    @GetMapping("/me")
    public AuthUserResponse getCurrentUser(Authentication authentication) {
        return authService.getCurrentUser(authentication.getName());
    }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }
}