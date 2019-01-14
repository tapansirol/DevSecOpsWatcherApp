package com.hcl.dsecops.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

import com.hcl.dsecops.model.IService;
import com.hcl.dsecops.model.ServiceType;

/**
 * Deploy tool chain on specified host machine.
 * @author varanganti.j
 *
 */
public class DeployToolChain {
	public static String EXEC = "exec";
	public static int DEFAULT_PORT = 22;
	public static String STRICT_HOST_CONFIG_KEY = "StrictHostKeyChecking";
	public static String STRICT_HOST_CONFIG_VALUE = "no";
	private static String LINE_BREAK = "<br>";
	private static String SHELL_COMMAND = "sh ";
	private static String STANDARD_STARTUP_COMMAND = "STANDARD_STARTUP_COMMAND";
	private static String PREMIUM_STARTUP_COMMAND = "PREMIUM_STARTUP_COMMAND";
	private static String CLEANUP = "CLEANUP";
	private static String STOP_SERVICES = "STOP_SERVICES";
	private static Map<String, String> toolsMap = new HashMap<>();
	
	public static StringBuilder result = new StringBuilder();

	/**
	 * Default constructor for initializing a map for tools and its respective shell command to execute. 
	 */
	public DeployToolChain() {
		toolsMap.put(IService.JENKINS_CODE, Configurations.getInstance().getJenkins_script());
		toolsMap.put(IService.UCD_CODE, Configurations.getInstance().getuDeploy_script());
		toolsMap.put(IService.UCV_CODE, Configurations.getInstance().getVelocity_script());
		toolsMap.put(IService.SONARQUBE_CODE, Configurations.getInstance().getSonar_script());
		toolsMap.put(STANDARD_STARTUP_COMMAND, Configurations.getInstance().getStartupStandard());
		toolsMap.put(PREMIUM_STARTUP_COMMAND, Configurations.getInstance().getStartupPremium());
		toolsMap.put(CLEANUP, Configurations.getInstance().getCleanup());
		toolsMap.put(STOP_SERVICES, Configurations.getInstance().getStop_services());
	}
	
	/**
	 * Method to execute script for installation of a specified tool which is included in automated pipeline
	 * @param toolCode to install in automated pipeline
	 * @return the console log from shell execution command
	 */
	public String installTool(String toolCode) {
		StringBuilder result = new StringBuilder();
		Process process=null;
		String line;
		try {
			 String command = SHELL_COMMAND+Configurations.getInstance().getHOME_PATH()+toolsMap.get(toolCode);
			System.out.println("Executing command "+command);
			process = Runtime.getRuntime().exec(command);
			BufferedReader br = new BufferedReader(
					new InputStreamReader(process.getInputStream()));
			while ((line = br.readLine()) != null) {
				result.append(line +LINE_BREAK);
				System.out.println(line);
			}
		} catch (Exception e) {
			System.out.println("Script exec error !");
			result.append("Script exec error !");
			e.printStackTrace();
		}
		finally{
			result.append("***COMPLETED***");
			if(process!=null) process.destroy();
		}  
		
		return result.toString();
	}
	
	/**
	 * Method to execute service type scripts for installation of the tools included in automated pipeline
	 * @param serviceType service type to install
	 * @return the console log from shell execution command
	 */
	public String installPipeline(ServiceType serviceType) {
		String line;
		Process process=null;
		try {
			String startScript = toolsMap.get(STANDARD_STARTUP_COMMAND);
			if (ServiceType.PREMIUM.equals(serviceType)) {
				startScript = toolsMap.get(PREMIUM_STARTUP_COMMAND);
			}
			String command = SHELL_COMMAND+Configurations.getInstance().getHOME_PATH()+startScript;
			System.out.println("Executing command "+command);
			process = Runtime.getRuntime().exec(command);
			BufferedReader br = new BufferedReader(
					new InputStreamReader(process.getInputStream()));
			while ((line = br.readLine()) != null) {
				result.append(line +LINE_BREAK);
				System.out.println(line);
			}
		} catch (Exception e) {
			System.out.println("Script exec error !");
			e.printStackTrace();
		}
		finally{
			result.append("***COMPLETED***");
			if(process!=null) process.destroy();
		}  
		return result.toString();
	}
	
	public static String getResult() {
		return result.toString();
	}
	
	public static void clear() {
		result.setLength(0);
	}
	
	public String cleanUp() {
		StringBuilder cleanupResults = new StringBuilder();
		String line;
		Process process=null;
		try {
			String cleanUpScript = toolsMap.get(CLEANUP);
			String command = SHELL_COMMAND+Configurations.getInstance().getHOME_PATH()+cleanUpScript;
			System.out.println("Executing command "+command);
			process = Runtime.getRuntime().exec(command);
			BufferedReader br = new BufferedReader(
					new InputStreamReader(process.getInputStream()));
			while ((line = br.readLine()) != null) {
				cleanupResults.append(line +LINE_BREAK);
				System.out.println(line);
			}
		} catch (Exception e) {
			System.out.println("Script exec error !");
			e.printStackTrace();
		}
		finally{
			cleanupResults.append("***COMPLETED***");
			if(process!=null) process.destroy();
		}  
		return cleanupResults.toString();
	}
	
	
	public String stopServices() {
		StringBuilder commandResults = new StringBuilder();
		String line;
		Process process=null;
		try {
			String stopServicesScript = toolsMap.get(STOP_SERVICES);
			String command = SHELL_COMMAND+Configurations.getInstance().getHOME_PATH()+stopServicesScript;
			System.out.println("Executing command "+command);
			process = Runtime.getRuntime().exec(command);
			BufferedReader br = new BufferedReader(
					new InputStreamReader(process.getInputStream()));
			while ((line = br.readLine()) != null) {
				commandResults.append(line +LINE_BREAK);
				System.out.println(line);
			}
		} catch (Exception e) {
			System.out.println("Script exec error !");
			e.printStackTrace();
		}
		finally{
			commandResults.append("***COMPLETED***");
			if(process!=null) process.destroy();
		}  
		return commandResults.toString();
	}
	
	

}
