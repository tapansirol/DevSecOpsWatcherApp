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

public class DeployToolChain {
	public static String EXEC = "exec";
	public static String IDENTITY_FILE_PATH = "C:\\Demo-SLT-ubuntu.pem";
	public static String USER_NAME = "ubuntu";
	public static String HOST = "18.204.68.202";
	public static int DEFAULT_PORT = 22;
	public static String STRICT_HOST_CONFIG_KEY = "StrictHostKeyChecking";
	public static String STRICT_HOST_CONFIG_VALUE = "no";
//	public static String COMMAND = "sh /home/ubuntu/Tapan/DevSecOps/startup.sh";
	public static String COMMAND = "sh /home/ubuntu/Tapan/DevSecOps/test.sh";
	private static Map<String, String> toolsMap = new HashMap<>();

	
	public DeployToolChain() {
		toolsMap.put("Jenkins", "sh /home/ubuntu/Tapan/DevSecOps/jenkins.sh");
	}
	
	public String installPipeline() {
        JSch jsch = new JSch();
        StringBuilder result = new StringBuilder();
        Session session;
        try {
        	
        	jsch.addIdentity(IDENTITY_FILE_PATH);

            // Open a Session to remote SSH server and Connect.
            // Set User and IP of the remote host and SSH port.
        	session = jsch.getSession(USER_NAME, HOST, DEFAULT_PORT);
        	
            // When we do SSH to a remote host for the 1st time or if key at the remote host 
            // changes, we will be prompted to confirm the authenticity of remote host. 
            // This check feature is controlled by StrictHostKeyChecking ssh parameter. 
            // By default StrictHostKeyChecking  is set to yes as a security measure.
            session.setConfig(STRICT_HOST_CONFIG_KEY, STRICT_HOST_CONFIG_VALUE);
            session.connect();
            session.setServerAliveCountMax(30);

            // create the execution channel over the session
            ChannelExec channelExec = (ChannelExec) session.openChannel(EXEC);
            // Set the command to execute on the channel and execute the command
            channelExec.setCommand(COMMAND);
            
            channelExec.connect();
            
            // Get an InputStream from this channel and read messages, generated 
            // by the executing command, from the remote side.

            InputStream in = channelExec.getExtInputStream();
            
            BufferedReader reader = new BufferedReader(new InputStreamReader(in));
            String line;
            while ((line = reader.readLine()) != null) {
            	result.append(line +"<br>");
                System.out.println(line);
            }

            // Command execution completed here.

            // Retrieve the exit status of the executed command
            int exitStatus = channelExec.getExitStatus();
            if (exitStatus > 0) {
                System.out.println("Remote script exec error! " + exitStatus);
            }
            //Disconnect the Session
            session.disconnect();
        } catch (JSchException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result.toString();
	}
	
	public String installTool(String toolName) {
        JSch jsch = new JSch();
        StringBuilder result = new StringBuilder();
        Session session;
        try {
        	
        	jsch.addIdentity(IDENTITY_FILE_PATH);

            // Open a Session to remote SSH server and Connect.
            // Set User and IP of the remote host and SSH port.
        	session = jsch.getSession(USER_NAME, HOST, DEFAULT_PORT);
        	
            // When we do SSH to a remote host for the 1st time or if key at the remote host 
            // changes, we will be prompted to confirm the authenticity of remote host. 
            // This check feature is controlled by StrictHostKeyChecking ssh parameter. 
            // By default StrictHostKeyChecking  is set to yes as a security measure.
            session.setConfig(STRICT_HOST_CONFIG_KEY, STRICT_HOST_CONFIG_VALUE);
            session.connect();
            session.setServerAliveCountMax(30);

            // create the execution channel over the session
            ChannelExec channelExec = (ChannelExec) session.openChannel(EXEC);
            // Set the command to execute on the channel and execute the command
            String command = toolsMap.get(toolName);
            channelExec.setCommand(command);
            
            channelExec.connect();
            
            // Get an InputStream from this channel and read messages, generated 
            // by the executing command, from the remote side.

            InputStream in = channelExec.getExtInputStream();
            
            BufferedReader reader = new BufferedReader(new InputStreamReader(in));
            String line;
            while ((line = reader.readLine()) != null) {
            	result.append(line +"<br>");
                System.out.println(line);
            }

            // Command execution completed here.

            // Retrieve the exit status of the executed command
            int exitStatus = channelExec.getExitStatus();
            if (exitStatus > 0) {
                System.out.println("Remote script exec error! " + exitStatus);
            }
            //Disconnect the Session
            session.disconnect();
        } catch (JSchException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result.toString();
	}
	
	public static void main(String[] args) {
		new DeployToolChain().installPipeline();
	}

}
