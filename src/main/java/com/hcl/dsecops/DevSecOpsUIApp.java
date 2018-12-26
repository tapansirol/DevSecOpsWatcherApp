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
	
	private static String CONFIG_FILE_PATH = " ../../config/config.properties";
//	private static String CONFIG_FILE_PATH = "/home/config/config.properties";

	public static void main(String[] args) {
		System.out.println("Starting Watcher Application .... ");
		loadProperties();
		SpringApplication.run(DevSecOpsUIApp.class, args);
		System.out.println("Started Watcher Application !!");

	}

	private static void loadProperties() {
		Properties props = new Properties();
		try{
			InputStream stream = new FileInputStream(CONFIG_FILE_PATH);
			props.load(stream);
			System.out.println("HOST_MACHINE_USER_NAME ====> "+props.getProperty("HOST_MACHINE_USER_NAME"));
			Configurations.getInstance().setProperties(props);
			
		}
		catch (IOException ioe) {
			ioe.printStackTrace();
		}
		catch(Exception e) {
			System.out.print("Unable to read the configurations file from "+CONFIG_FILE_PATH);
			System.out.println(e.getMessage());
		}
	} 

}
