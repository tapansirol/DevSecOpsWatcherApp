package com.hcl.dsecops.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

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
	public static String IDENTITY_FILE_PATH = "C:\\Demo-SLT-ubuntu.pem";
	public static String USER_NAME = "ubuntu";
	public static String HOST = "18.204.68.202";
	public static int DEFAULT_PORT = 22;
	public static String STRICT_HOST_CONFIG_KEY = "StrictHostKeyChecking";
	public static String STRICT_HOST_CONFIG_VALUE = "no";
	public static String COMMAND = "sh /home/ubuntu/Tapan/DevSecOps/startup.sh";
	private static Map<String, String> toolsMap = new HashMap<>();

	/**
	 * Default constructor for initializing a map for tools and its respective shell command to execute. 
	 */
	public DeployToolChain() {
		toolsMap.put("Jenkins", "sh /home/ubuntu/Tapan/DevSecOps/Jenkins/docker-compose.yml");
	}
	
	/**
	 * Method to execute scripts for installation of the tools included in automated pipeline
	 * @return the console log from shell execution command
	 */
	public String installPipeline() {
        JSch jsch = new JSch();
        StringBuilder result = new StringBuilder();
        Session session;
        try {
        	
        	jsch.addIdentity(IDENTITY_FILE_PATH);
        	session = jsch.getSession(USER_NAME, HOST, DEFAULT_PORT);
            session.setConfig(STRICT_HOST_CONFIG_KEY, STRICT_HOST_CONFIG_VALUE);
            session.connect();
            session.setServerAliveCountMax(30);
            ChannelExec channelExec = (ChannelExec) session.openChannel(EXEC);
            channelExec.setCommand(COMMAND);
            channelExec.connect();
            InputStream in = channelExec.getExtInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(in));
            String line;
            while ((line = reader.readLine()) != null) {
            	result.append(line +"<br>");
                System.out.println(line);
            }
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
        	session = jsch.getSession(USER_NAME, HOST, DEFAULT_PORT);
            session.setConfig(STRICT_HOST_CONFIG_KEY, STRICT_HOST_CONFIG_VALUE);
            session.connect();
            session.setServerAliveCountMax(30);
            ChannelExec channelExec = (ChannelExec) session.openChannel(EXEC);
            String command = toolsMap.get(toolName);
            channelExec.setCommand(command);
            channelExec.connect();
            InputStream in = channelExec.getExtInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(in));
            String line;
            while ((line = reader.readLine()) != null) {
            	result.append(line +"<br>");
                System.out.println(line);
            }
            int exitStatus = channelExec.getExitStatus();
            if (exitStatus > 0) {
            	result.append("Remote script exec error! " + exitStatus);
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
