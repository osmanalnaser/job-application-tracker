package com.osmanalnaser.job_application_tracker.dashboard;

import com.osmanalnaser.job_application_tracker.application.JobApplicationService;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final JobApplicationService jobApplicationService;

    public DashboardService(JobApplicationService jobApplicationService) {
        this.jobApplicationService = jobApplicationService;
    }

    public DashboardResponse getDashboard(String userEmail) {
        DashboardResponse response = new DashboardResponse();
        response.setStats(jobApplicationService.getApplicationStats(userEmail));
        response.setRecentApplications(jobApplicationService.getRecentApplications(userEmail));
        response.setUpcomingReminders(jobApplicationService.getUpcomingReminders(userEmail));
        response.setTodayReminders(jobApplicationService.getTodayReminders(userEmail));
        return response;
    }
}