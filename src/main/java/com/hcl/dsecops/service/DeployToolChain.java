package com.hcl.dsecops.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

import com.hcl.dsecops.model.IService;
import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
/**
 * Deploy tool chain on specified host machine.
 * @author varanganti.j
 *
 */
public class DeployToolChain {
	public static String EXEC = "exec";
//	public static String IDENTITY_FILE_PATH = "C:\\Demo-SLT-ubuntu.pem";
	public static String IDENTITY_FILE_PATH = "/home/ubuntu/Tapan/config/Demo-SLT-ubuntu.pem";
	public static int DEFAULT_PORT = 22;
	public static String STRICT_HOST_CONFIG_KEY = "StrictHostKeyChecking";
	public static String STRICT_HOST_CONFIG_VALUE = "no";
	private static String LINE_BREAK = "<br>";
	private static String SHELL_COMMAND = "sh ";
	private static String STARTUP_COMMAND = "STARTUP_COMMAND";
	private static Map<String, String> toolsMap = new HashMap<>();
	
	public static StringBuilder result = new StringBuilder();;

	/**
	 * Default constructor for initializing a map for tools and its respective shell command to execute. 
	 */
	public DeployToolChain() {
		toolsMap.put(IService.JENKINS_CODE, Configurations.getInstance().getJenkins_script());
		toolsMap.put(IService.UCD_CODE, Configurations.getInstance().getuDeploy_script());
		toolsMap.put(IService.UCV_CODE, Configurations.getInstance().getVelocity_script());
		toolsMap.put(IService.SONARQUBE_CODE, Configurations.getInstance().getSonar_script());
		toolsMap.put(STARTUP_COMMAND, Configurations.getInstance().getStartup());
		
	}
	
	/**
	 * Method to execute scripts for installation of the tools included in automated pipeline
	 * @return the console log from shell execution command
	 */
	public String installPipeline() {
        JSch jsch = new JSch();
         result.setLength(0);
        Session session;
        try {
        	
        	jsch.addIdentity(IDENTITY_FILE_PATH);
        	session = jsch.getSession(Configurations.getInstance().getHOST_MACHINE_USER_NAME(), Configurations.getInstance().getIP(), DEFAULT_PORT);
            session.setConfig(STRICT_HOST_CONFIG_KEY, STRICT_HOST_CONFIG_VALUE);
            session.connect();
            session.setServerAliveCountMax(30);
            ChannelExec channelExec = (ChannelExec) session.openChannel(EXEC);
            String command = SHELL_COMMAND+Configurations.getInstance().getHOME_PATH()+toolsMap.get(STARTUP_COMMAND);
            System.out.println("COMMAND EXECUTING ================> "+command);
            channelExec.setCommand(command);
            channelExec.connect();
            InputStream in = channelExec.getExtInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(in));
            String line;
            while ((line = reader.readLine()) != null) {
            	result.append(line +LINE_BREAK);
                System.out.println(line);
            }
            result.append("***COMPLETED***");
            int exitStatus = channelExec.getExitStatus();
            if (exitStatus > 0) {
                System.out.println("Remote script exec error! " + exitStatus);
            }
            session.disconnect();
        } catch (JSchException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result.toString();
	}
	
	/**
	 * Method to execute script for installation of a specified tool which is included in automated pipeline
	 * @param toolName to install in automated pipeline
	 * @return the console log from shell execution command
	 */
	public String installTool(String toolName) {
        JSch jsch = new JSch();
        StringBuilder result = new StringBuilder();
        Session session;
        try {
        	jsch.addIdentity(IDENTITY_FILE_PATH);
        	session = jsch.getSession(Configurations.getInstance().getHOST_MACHINE_USER_NAME(), Configurations.getInstance().getIP(), DEFAULT_PORT);
            session.setConfig(STRICT_HOST_CONFIG_KEY, STRICT_HOST_CONFIG_VALUE);
            session.connect();
            session.setServerAliveCountMax(30);
            ChannelExec channelExec = (ChannelExec) session.openChannel(EXEC);
            String command = SHELL_COMMAND+Configurations.getInstance().getHOME_PATH()+toolsMap.get(toolsMap.get(toolName));
            channelExec.setCommand(command);
            channelExec.connect();
            InputStream in = channelExec.getExtInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(in));
            String line;
            while ((line = reader.readLine()) != null) {
            	result.append(line +LINE_BREAK);
                System.out.println(line);
            }
            result.append("***COMPLETED***");
            int exitStatus = channelExec.getExitStatus();
            if (exitStatus > 0) {
                System.out.println("Remote script exec error! " + exitStatus);
            }
            session.disconnect();
        } catch (JSchException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result.toString();
	}
	
}
