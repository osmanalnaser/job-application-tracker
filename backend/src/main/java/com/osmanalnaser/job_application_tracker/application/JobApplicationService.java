package com.osmanalnaser.job_application_tracker.application;

import com.osmanalnaser.job_application_tracker.dashboard.DashboardResponse;
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

    public List<JobApplicationResponse> getAllApplications(String userEmail) {

        return jobApplicationRepository.findByUserEmailOrderByAppliedDateDesc(userEmail)
                .stream()
                .map(jobApplicationMapper::toResponse)
                .collect(Collectors.toList());
    }

    public JobApplicationResponse createApplication(CreateJobApplicationRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

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

    public JobApplicationResponse getApplicationById(Long id, String userEmail) {
        JobApplication jobApplication = findJobApplicationById(id, userEmail);
        return jobApplicationMapper.toResponse(jobApplication);
    }

    public void deleteApplication(Long id, String userEmail) {
        JobApplication jobApplication = findJobApplicationById(id, userEmail);

        jobApplicationRepository.delete(jobApplication);
    }

    public JobApplicationResponse updateApplication(Long id, String userEmail, UpdateJobApplicationRequest request) {
        JobApplication jobApplication = findJobApplicationById(id, userEmail);
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

    private JobApplication findJobApplicationById(Long id, String userEmail) {
        return jobApplicationRepository.findByIdAndUserEmail(id, userEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job application not found"));
    }

    public JobApplicationResponse updateApplicationStatus(Long id, String userEmail, UpdateApplicationStatusRequest request) {
        JobApplication jobApplication = findJobApplicationById(id, userEmail);
        jobApplication.setStatus(request.getStatus());
        jobApplication.setUpdatedAt(LocalDateTime.now());

        JobApplication updatedJobApplication = jobApplicationRepository.save(jobApplication);
        return jobApplicationMapper.toResponse(updatedJobApplication);
    }

    public List<JobApplicationResponse> getApplicationsByStatus(String userEmail, ApplicationStatus status) {
        return jobApplicationRepository.findByUserEmailAndStatusOrderByAppliedDateDesc(userEmail, status)
                .stream()
                .map(jobApplicationMapper::toResponse)
                .collect(Collectors.toList());
    }

    public ApplicationStatsResponse getApplicationStats(String userEmail) {
        ApplicationStatsResponse stats = new ApplicationStatsResponse();

        stats.setApplied(jobApplicationRepository.countByUserEmailAndStatus(userEmail, ApplicationStatus.APPLIED));
        stats.setInterview(jobApplicationRepository.countByUserEmailAndStatus(userEmail, ApplicationStatus.INTERVIEW));
        stats.setRejected(jobApplicationRepository.countByUserEmailAndStatus(userEmail, ApplicationStatus.REJECTED));
        stats.setOffer(jobApplicationRepository.countByUserEmailAndStatus(userEmail, ApplicationStatus.OFFER));

        stats.setTotal(
                stats.getApplied()
                        + stats.getInterview()
                        + stats.getRejected()
                        + stats.getOffer()
        );

        return stats;
    }

    public List<JobApplicationResponse> getRecentApplications(String userEmail) {
        return jobApplicationRepository.findTop5ByUserEmailOrderByAppliedDateDesc(userEmail)
                .stream()
                .map(jobApplicationMapper::toResponse)
                .collect(Collectors.toList());
    }

    public DashboardResponse getDashboard(String userEmail) {

        DashboardResponse response = new DashboardResponse();

        List<JobApplicationResponse> recentApplications =
                jobApplicationRepository
                        .findTop5ByUserEmailOrderByAppliedDateDesc(userEmail)
                        .stream()
                        .map(jobApplicationMapper::toResponse)
                        .toList();

        response.setRecentApplications(recentApplications);

        response.setStats(getApplicationStats(userEmail));

        return response;
    }

    public List<JobApplicationResponse> searchApplications(String userEmail, String keyword) {

        return jobApplicationRepository
                .searchByUserEmailAndKeyword(userEmail, keyword)
                .stream()
                .map(jobApplicationMapper::toResponse)
                .toList();
    }

}
