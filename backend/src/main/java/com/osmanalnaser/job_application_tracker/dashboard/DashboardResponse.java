package com.osmanalnaser.job_application_tracker.dashboard;

import com.osmanalnaser.job_application_tracker.application.ApplicationStatsResponse;
import com.osmanalnaser.job_application_tracker.application.JobApplicationResponse;

import java.util.List;

public class DashboardResponse {

    private ApplicationStatsResponse stats;
    private List<JobApplicationResponse> recentApplications;
    private List<JobApplicationResponse> upcomingReminders;
    private List<JobApplicationResponse> todayReminders;

    public DashboardResponse() {
    }

    public ApplicationStatsResponse getStats() {
        return stats;
    }

    public void setStats(ApplicationStatsResponse stats) {
        this.stats = stats;
    }

    public List<JobApplicationResponse> getRecentApplications() {
        return recentApplications;
    }

    public void setRecentApplications(List<JobApplicationResponse> recentApplications) {
        this.recentApplications = recentApplications;
    }

    public List<JobApplicationResponse> getUpcomingReminders() {
        return upcomingReminders;
    }

    public void setUpcomingReminders(List<JobApplicationResponse> upcomingReminders) {
        this.upcomingReminders = upcomingReminders;
    }

    public List<JobApplicationResponse> getTodayReminders() {
        return todayReminders;
    }

    public void setTodayReminders(List<JobApplicationResponse> todayReminders) {
        this.todayReminders = todayReminders;
    }
}