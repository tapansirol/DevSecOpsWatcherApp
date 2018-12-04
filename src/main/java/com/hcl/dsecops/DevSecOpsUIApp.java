package com.hcl.dsecops;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Properties;
import java.util.PropertyResourceBundle;
import java.util.ResourceBundle;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DevSecOpsUIApp {

	//	private static ResourceBundle rb = PropertyResourceBundle..getBundle("../../config");

	public static void main(String[] args) {
		System.out.println("DevSecOpsUIApp.main() Before SpringApplication.run");
		//		 String browser = rb.getString("host.ip");
		//	        System.out.println("host.ip ====> "+browser);
		loadProperties();
		SpringApplication.run(DevSecOpsUIApp.class, args);
		System.out.println("DevSecOpsUIApp.main() After SpringApplication.run");

	}

	private static void loadProperties() {
		Properties prop = new Properties();
		try{
			File jarPath=new File(DevSecOpsUIApp.class.getProtectionDomain().getCodeSource().getLocation().getPath());
			System.out.println("jarPath =====> "+jarPath);
			String propertiesPath=jarPath.getParentFile().getParentFile().getAbsolutePath();
			System.out.println("propertiesPath =====> "+propertiesPath);
			propertiesPath = propertiesPath+"/config/config.properties";
//			URL url = new URL(propertiesPath);
			InputStream stream = new FileInputStream(propertiesPath);
			
//			InputStream stream = DevSecOpsUIApp.class.getClass().getResourceAsStream("/config/config.properties");
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
