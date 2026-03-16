package com.osmanalnaser.job_application_tracker.application;

public class ApplicationStatsResponse {

    private long applied;
    private long interview;
    private long rejected;
    private long offer;
    private long total;

    public ApplicationStatsResponse() {
    }

    public long getApplied() {
        return applied;
    }

    public void setApplied(long applied) {
        this.applied = applied;
    }

    public long getInterview() {
        return interview;
    }

    public void setInterview(long interview) {
        this.interview = interview;
    }

    public long getRejected() {
        return rejected;
    }

    public void setRejected(long rejected) {
        this.rejected = rejected;
    }

    public long getOffer() {
        return offer;
    }

    public void setOffer(long offer) {
        this.offer = offer;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }
}
