CREATE TABLE users (
                       id BIGSERIAL PRIMARY KEY,
                       name VARCHAR(100) NOT NULL,
                       email VARCHAR(150) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE job_applications (
                                  id BIGSERIAL PRIMARY KEY,
                                  company VARCHAR(150) NOT NULL,
                                  position VARCHAR(150) NOT NULL,
                                  location VARCHAR(150),
                                  job_url VARCHAR(500),
                                  salary_range VARCHAR(100),
                                  status VARCHAR(50) NOT NULL,
                                  applied_date DATE NOT NULL,
                                  reminder_date DATE,
                                  notes TEXT,
                                  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                  user_id BIGINT NOT NULL,
                                  CONSTRAINT fk_job_applications_user
                                      FOREIGN KEY (user_id)
                                          REFERENCES users(id)
                                          ON DELETE CASCADE
);