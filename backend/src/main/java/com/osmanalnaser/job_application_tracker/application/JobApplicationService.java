package com.osmanalnaser.job_application_tracker.application;

import com.osmanalnaser.job_application_tracker.user.User;
import com.osmanalnaser.job_application_tracker.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;
    private final UserRepository userRepository;

    public JobApplicationService(JobApplicationRepository jobApplicationRepository, UserRepository userRepository) {
        this.jobApplicationRepository = jobApplicationRepository;
        this.userRepository = userRepository;
    }

    public List<JobApplicationResponse> getAllApplications() {

        return jobApplicationRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public JobApplicationResponse createApplication(CreateJobApplicationRequest request) {
        User user = userRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("User not found"));

        JobApplication jobApplication = new JobApplication();
        jobApplication.setCompany(request.getCompany());
        jobApplication.setPosition(request.getPosition());
        jobApplication.setLocation(request.getLocation());
        jobApplication.setJobUrl(request.getJobUrl());
        jobApplication.setSalaryRange(request.getSalaryRange());
        jobApplication.setStatus(request.getStatus());
        jobApplication.setAppliedDate(request.getAppliedDate());
        jobApplication.setReminderDate(request.getReminderDate());
        jobApplication.setNotes(request.getNotes());
        jobApplication.setCreatedAt(LocalDateTime.now());
        jobApplication.setUpdatedAt(LocalDateTime.now());
        jobApplication.setUser(user);

        JobApplication savedJobApplication = jobApplicationRepository.save(jobApplication);
        return mapToResponse(savedJobApplication);
    }

    public JobApplicationResponse getApplicationById(Long id) {
        JobApplication jobApplication = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job application not found"));

        return mapToResponse(jobApplication);
    }

    public void deleteApplication(Long id) {
        JobApplication jobApplication = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job application not found"));

        jobApplicationRepository.delete(jobApplication);
    }

    public JobApplicationResponse updateApplication(Long id, UpdateJobApplicationRequest request) {
        JobApplication jobApplication = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job application not found"));

        jobApplication.setCompany(request.getCompany());
        jobApplication.setPosition(request.getPosition());
        jobApplication.setLocation(request.getLocation());
        jobApplication.setJobUrl(request.getJobUrl());
        jobApplication.setSalaryRange(request.getSalaryRange());
        jobApplication.setStatus(request.getStatus());
        jobApplication.setAppliedDate(request.getAppliedDate());
        jobApplication.setReminderDate(request.getReminderDate());
        jobApplication.setNotes(request.getNotes());
        jobApplication.setUpdatedAt(LocalDateTime.now());

        JobApplication updatedJobApplication = jobApplicationRepository.save(jobApplication);
        return mapToResponse(updatedJobApplication);
    }

    private JobApplicationResponse mapToResponse(JobApplication jobApplication) {
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
