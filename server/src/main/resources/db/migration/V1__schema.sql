
CREATE SEQUENCE IF NOT EXISTS users_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE users
(
    id                      BIGINT       NOT NULL,
    username                VARCHAR(255) NOT NULL,
    email                   VARCHAR(255) NOT NULL,
    password                VARCHAR(255) NOT NULL,
    enabled                 BOOLEAN      NOT NULL,
    verification_code       VARCHAR(255),
    verification_expiration TIMESTAMP WITHOUT TIME ZONE,
    CONSTRAINT pk_users PRIMARY KEY (id)
);

ALTER TABLE users
    ADD CONSTRAINT uc_users_email UNIQUE (email);

ALTER TABLE users
    ADD CONSTRAINT uc_users_username UNIQUE (username);