package com.osmanalnaser.job_application_tracker.application;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
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
    public List<JobApplicationResponse> getAllApplications(@RequestParam(required = false) ApplicationStatus status,
                                                           Authentication authentication) {
        if (status != null) {
            return jobApplicationService.getApplicationsByStatus(authentication.getName(), status);
        }

        return jobApplicationService.getAllApplications(authentication.getName());
    }

    @GetMapping("/{id}")
    public JobApplicationResponse getApplicationById(@PathVariable Long id) {
        return jobApplicationService.getApplicationById(id);
    }

    @PostMapping
    public JobApplicationResponse createApplication(@Valid @RequestBody CreateJobApplicationRequest request,
                                                    Authentication authentication) {
        return jobApplicationService.createApplication(request, authentication.getName());
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
