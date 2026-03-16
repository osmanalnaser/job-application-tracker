package com.osmanalnaser.job_application_tracker.auth;

public class AuthUserResponse {

    private String name;
    private String email;

    public AuthUserResponse() {
    }

    public AuthUserResponse(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }
}