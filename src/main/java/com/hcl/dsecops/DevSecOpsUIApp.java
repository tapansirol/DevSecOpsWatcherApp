package com.hcl.dsecops;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DevSecOpsUIApp {
	
	public static void main(String[] args) {
		System.out.println("DevSecOpsUIApp.main() Before SpringApplication.run");
		SpringApplication.run(DevSecOpsUIApp.class, args);
		System.out.println("DevSecOpsUIApp.main() After SpringApplication.run");
	}

}
