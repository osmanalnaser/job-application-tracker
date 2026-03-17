package com.osmanalnaser.job_application_tracker.application;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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

    @Query("SELECT j FROM JobApplication j " +
            "WHERE j.user.email = :email " +
            "AND (LOWER(j.company) " +
            "LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(j.position) " +
            "LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "ORDER BY j.appliedDate DESC")
    List<JobApplication> searchByUserEmailAndKeyword(@Param("email") String email,
                                                     @Param("keyword") String keyword);

    org.springframework.data.domain.Page<JobApplication> findByUserEmailOrderByAppliedDateDesc(
            String email,
            org.springframework.data.domain.Pageable pageable
    );

    org.springframework.data.domain.Page<JobApplication> findByUserEmailAndStatusOrderByAppliedDateDesc(
            String email,
            ApplicationStatus status,
            org.springframework.data.domain.Pageable pageable
    );

    @Query(
            value = "SELECT j FROM JobApplication j " +
                    "WHERE j.user.email = :email " +
                    "AND (LOWER(j.company) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
                    "OR LOWER(j.position) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
                    "ORDER BY j.appliedDate DESC",
            countQuery = "SELECT COUNT(j) FROM JobApplication j " +
                    "WHERE j.user.email = :email " +
                    "AND (LOWER(j.company) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
                    "OR LOWER(j.position) LIKE LOWER(CONCAT('%', :keyword, '%')))"
    )
    org.springframework.data.domain.Page<JobApplication> searchPageByUserEmailAndKeyword(
            @Param("email") String email,
            @Param("keyword") String keyword,
            org.springframework.data.domain.Pageable pageable
    );

    @Query(
            value = "SELECT j FROM JobApplication j " +
                    "WHERE j.user.email = :email " +
                    "AND j.status = :status " +
                    "AND (LOWER(j.company) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
                    "OR LOWER(j.position) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
                    "ORDER BY j.appliedDate DESC",
            countQuery = "SELECT COUNT(j) FROM JobApplication j " +
                    "WHERE j.user.email = :email " +
                    "AND j.status = :status " +
                    "AND (LOWER(j.company) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
                    "OR LOWER(j.position) LIKE LOWER(CONCAT('%', :keyword, '%')))"
    )
    org.springframework.data.domain.Page<JobApplication> searchPageByUserEmailAndKeywordAndStatus(
            @Param("email") String email,
            @Param("keyword") String keyword,
            @Param("status") ApplicationStatus status,
            org.springframework.data.domain.Pageable pageable
    );

    List<JobApplication> findByUserEmailAndReminderDateGreaterThanEqualOrderByReminderDateAsc(
            String email,
            java.time.LocalDate date
    );

}
