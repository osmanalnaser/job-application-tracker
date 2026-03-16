package com.osmanalnaser.job_application_tracker.dashboard;

import com.osmanalnaser.job_application_tracker.application.ApplicationStatsResponse;
import com.osmanalnaser.job_application_tracker.application.JobApplicationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DashboardController {

    private final JobApplicationService jobApplicationService;

    public DashboardController(JobApplicationService jobApplicationService) {
        this.jobApplicationService = jobApplicationService;
    }

    @GetMapping("/api/dashboard/stats")
    public ApplicationStatsResponse getApplicationStats() {
        return jobApplicationService.getApplicationStats();
    }
}