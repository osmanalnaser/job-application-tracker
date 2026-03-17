package com.osmanalnaser.job_application_tracker.application;

import com.osmanalnaser.job_application_tracker.common.PageResponse;
import com.osmanalnaser.job_application_tracker.dashboard.DashboardResponse;
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
    public JobApplicationResponse getApplicationById(@PathVariable Long id,
                                                     Authentication authentication) {
        return jobApplicationService.getApplicationById(id, authentication.getName());
    }

    @PostMapping
    public JobApplicationResponse createApplication(@Valid @RequestBody CreateJobApplicationRequest request,
                                                    Authentication authentication) {
        return jobApplicationService.createApplication(request, authentication.getName());
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteApplication(@PathVariable Long id,
                                  Authentication authentication) {

        jobApplicationService.deleteApplication(id, authentication.getName());
    }

    @PutMapping("/{id}")
    public JobApplicationResponse updateApplication(@PathVariable Long id,
                                            @RequestBody @Valid UpdateJobApplicationRequest request,
                                                    Authentication authentication) {
        return jobApplicationService.updateApplication(id, authentication.getName(), request);
    }

    @PatchMapping("/{id}/status")
    public JobApplicationResponse updateApplicationStatus(@PathVariable Long id,
                                                          @Valid @RequestBody UpdateApplicationStatusRequest request,
                                                          Authentication authentication) {
        return jobApplicationService.updateApplicationStatus(id, authentication.getName(), request);
    }

    @GetMapping("/dashboard")
    public DashboardResponse getDashboard(Authentication authentication) {
        return jobApplicationService.getDashboard(authentication.getName());
    }

    @GetMapping("/search")
    public List<JobApplicationResponse> searchApplications(@RequestParam String keyword,
                                                           Authentication authentication) {

        return jobApplicationService.searchApplications(authentication.getName(), keyword);
    }

    @GetMapping("/page")
    public PageResponse<JobApplicationResponse> getApplicationsPage(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) ApplicationStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {

        org.springframework.data.domain.Pageable pageable =
                org.springframework.data.domain.PageRequest.of(page, size);

        String userEmail = authentication.getName();

        if (keyword != null && !keyword.isBlank() && status != null) {
            return PageResponse.from(
                    jobApplicationService.searchApplicationsPageByKeywordAndStatus(userEmail, keyword, status, pageable)
            );
        }
        if (keyword != null && !keyword.isBlank()) {
            return PageResponse.from(
                    jobApplicationService.searchApplicationsPage(authentication.getName(), keyword, pageable)
            );
        }
        if (status != null) {
            return PageResponse.from(
                    jobApplicationService.getApplicationsPageByStatus(authentication.getName(), status, pageable)
            );
        }
        return PageResponse.from(
                jobApplicationService.getApplicationsPage(authentication.getName(), pageable)
        );
    }
    @GetMapping("/reminders/upcoming")
    public List<JobApplicationResponse> getUpcomingReminders(Authentication authentication) {
        return jobApplicationService.getUpcomingReminders(authentication.getName());
    }

    @GetMapping("/reminders/today")
    public List<JobApplicationResponse> getTodayReminders(Authentication authentication) {
        return jobApplicationService.getTodayReminders(authentication.getName());
    }
}
