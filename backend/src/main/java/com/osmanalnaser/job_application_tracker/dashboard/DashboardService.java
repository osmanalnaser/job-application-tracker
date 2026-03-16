package com.osmanalnaser.job_application_tracker.dashboard;

import com.osmanalnaser.job_application_tracker.application.JobApplicationService;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final JobApplicationService jobApplicationService;

    public DashboardService(JobApplicationService jobApplicationService) {
        this.jobApplicationService = jobApplicationService;
    }

    public DashboardResponse getDashboard() {
        DashboardResponse response = new DashboardResponse();
        response.setStats(jobApplicationService.getApplicationStats());
        response.setRecentApplications(jobApplicationService.getRecentApplications());
        return response;
    }
}