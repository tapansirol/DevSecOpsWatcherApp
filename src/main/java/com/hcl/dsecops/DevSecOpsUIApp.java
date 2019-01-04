package com.hcl.dsecops;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DevSecOpsUIApp {
	
	public static void main(String[] args) {
		System.out.println("Starting Watcher Application .... ");
		SpringApplication.run(DevSecOpsUIApp.class, args);
		System.out.println("Started Watcher Application !!");

	}

}
