package com.smartgarden.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@SpringBootApplication
public class ServerApplication implements CommandLineRunner {

	private static final Logger log = LoggerFactory.getLogger(ServerApplication.class);  // Manually defining the logger
	private final DataSource dataSource;

	public ServerApplication(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		log.info("Datasource: " + dataSource.toString());  // Using manually defined logger
		final JdbcTemplate restTemplate = new JdbcTemplate(dataSource);
		restTemplate.execute("SELECT 1");
	}
}
