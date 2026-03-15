package com.osmanalnaser.job_application_tracker.application;

import org.springframework.stereotype.Component;

@Component
public class JobApplicationMapper {

    public JobApplicationResponse toResponse(JobApplication jobApplication) {
        JobApplicationResponse response = new JobApplicationResponse();
        response.setId(jobApplication.getId());
        response.setCompany(jobApplication.getCompany());
        response.setPosition(jobApplication.getPosition());
        response.setLocation(jobApplication.getLocation());
        response.setJobUrl(jobApplication.getJobUrl());
        response.setSalaryRange(jobApplication.getSalaryRange());
        response.setStatus(jobApplication.getStatus());
        response.setAppliedDate(jobApplication.getAppliedDate());
        response.setReminderDate(jobApplication.getReminderDate());
        response.setNotes(jobApplication.getNotes());
        response.setCreatedAt(jobApplication.getCreatedAt());
        response.setUpdatedAt(jobApplication.getUpdatedAt());
        return response;
    }
}