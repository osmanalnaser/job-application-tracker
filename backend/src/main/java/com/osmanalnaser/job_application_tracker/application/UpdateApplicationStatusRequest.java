package com.osmanalnaser.job_application_tracker.application;

import jakarta.validation.constraints.NotNull;

public class UpdateApplicationStatusRequest {

    @NotNull
    private ApplicationStatus status;

    public UpdateApplicationStatusRequest() {
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }
}