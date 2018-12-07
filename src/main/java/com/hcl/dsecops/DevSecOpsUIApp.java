package com.hcl.dsecops;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.hcl.dsecops.service.Configurations;

@SpringBootApplication
public class DevSecOpsUIApp {

	public static void main(String[] args) {
		System.out.println("DevSecOpsUIApp.main() Before SpringApplication.run");
		loadProperties();
		SpringApplication.run(DevSecOpsUIApp.class, args);
		System.out.println("DevSecOpsUIApp.main() After SpringApplication.run");

	}

	private static void loadProperties() {
		Properties props = new Properties();
		try{
			InputStream stream = new FileInputStream(" ../../config/config.properties");
//			InputStream stream = new FileInputStream("/home/ubuntu/Tapan/config/config.properties");
			props.load(stream);
			System.out.println("HOST_MACHINE_USER_NAME ====> "+props.getProperty("HOST_MACHINE_USER_NAME"));
			Configurations.getInstance().setProperties(props);
			
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
