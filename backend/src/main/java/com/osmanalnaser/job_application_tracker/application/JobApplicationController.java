package com.osmanalnaser.job_application_tracker.application;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;

    public JobApplicationController(JobApplicationService jobApplicationService) {
        this.jobApplicationService = jobApplicationService;
    }

    @GetMapping
    public List<JobApplication> getAllApplications() {
        return jobApplicationService.getAllApplications();
    }

    @PostMapping
    public JobApplication createApplication(@RequestBody CreateJobApplicationRequest request) {
        return jobApplicationService.createApplication(request);
    }
}
