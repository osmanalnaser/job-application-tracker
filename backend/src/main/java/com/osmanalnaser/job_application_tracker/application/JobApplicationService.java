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
    private final JobApplicationMapper jobApplicationMapper;

    public JobApplicationService(JobApplicationRepository jobApplicationRepository, UserRepository userRepository, JobApplicationMapper jobApplicationMapper) {
        this.jobApplicationRepository = jobApplicationRepository;
        this.userRepository = userRepository;
        this.jobApplicationMapper = jobApplicationMapper;
    }

    public List<JobApplicationResponse> getAllApplications() {

        return jobApplicationRepository.findAll()
                .stream()
                .map(jobApplicationMapper::toResponse)
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
        return jobApplicationMapper.toResponse(savedJobApplication);
    }

    public JobApplicationResponse getApplicationById(Long id) {
        JobApplication jobApplication = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job application not found"));

        return jobApplicationMapper.toResponse(jobApplication);
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
        return jobApplicationMapper.toResponse(updatedJobApplication);
    }

}
