package com.osmanalnaser.job_application_tracker.application;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
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
    public List<JobApplicationResponse> getAllApplications() {
        return jobApplicationService.getAllApplications();
    }

    @GetMapping("/{id}")
    public JobApplicationResponse getApplicationById(@PathVariable Long id) {
        return jobApplicationService.getApplicationById(id);
    }

    @PostMapping
    public JobApplicationResponse createApplication(@RequestBody @Valid CreateJobApplicationRequest request) {
        return jobApplicationService.createApplication(request);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteApplication(@PathVariable Long id) {
        jobApplicationService.deleteApplication(id);
    }

    @PutMapping("/{id}")
    public JobApplicationResponse updateApplication(@PathVariable Long id,
                                            @RequestBody @Valid UpdateJobApplicationRequest request) {
        return jobApplicationService.updateApplication(id, request);
    }

    @PatchMapping("/{id}/status")
    public JobApplicationResponse updateApplicationStatus(@PathVariable Long id,
                                                          @Valid @RequestBody UpdateApplicationStatusRequest request) {
        return jobApplicationService.updateApplicationStatus(id, request);
    }
}
