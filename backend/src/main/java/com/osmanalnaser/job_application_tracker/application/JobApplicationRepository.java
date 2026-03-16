package com.osmanalnaser.job_application_tracker.application;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findAllByOrderByAppliedDateDesc();
    List<JobApplication> findByStatusOrderByAppliedDateDesc(ApplicationStatus status);
    List<JobApplication> findTop5ByOrderByAppliedDateDesc();
    List<JobApplication> findByUserEmailOrderByAppliedDateDesc(String email);
    List<JobApplication> findByUserEmailAndStatusOrderByAppliedDateDesc(String email, ApplicationStatus status);
    Optional<JobApplication> findByIdAndUserEmail(Long id, String email);
    List<JobApplication> findTop5ByUserEmailOrderByAppliedDateDesc(String email);
    long countByStatus(ApplicationStatus status);
    long countByUserEmailAndStatus(String email, ApplicationStatus status);

}
