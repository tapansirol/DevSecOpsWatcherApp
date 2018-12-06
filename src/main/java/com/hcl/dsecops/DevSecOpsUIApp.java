package com.hcl.dsecops;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DevSecOpsUIApp {

	public static void main(String[] args) {
		System.out.println("DevSecOpsUIApp.main() Before SpringApplication.run");
		loadProperties();
		SpringApplication.run(DevSecOpsUIApp.class, args);
		System.out.println("DevSecOpsUIApp.main() After SpringApplication.run");

	}

	private static void loadProperties() {
		Properties prop = new Properties();
		try{
			InputStream stream = new FileInputStream(" ../../config/config.properties");
			prop.load(stream);
			System.out.println("host.ip ====> "+prop.getProperty("host.ip"));
		}
		catch (IOException ioe) {
			ioe.printStackTrace();
		}
		catch(Exception e) {
			System.out.print("error file to stream: ");
			System.out.println(e.getMessage());
		}
	} 

}
