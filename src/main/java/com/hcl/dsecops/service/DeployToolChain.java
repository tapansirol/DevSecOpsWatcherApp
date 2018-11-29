package com.hcl.dsecops.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.List;

import com.hcl.dsecops.PipelineUtil;
import com.hcl.dsecops.model.PipeLine;
import com.hcl.dsecops.model.Service;
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
	public static String COMMAND = "sh /home/ubuntu/Tapan/DevSecOps/startup.sh";

	public String deploy() {
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
            	result.append(line);
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
//            setServiceStatus();
        } catch (JSchException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result.toString();
	}
	
	private void setServiceStatus() {
		PipeLine p = PipelineUtil.getPipelines().get(0);
		GetPingStatus pingStatus = new GetPingStatus();
		List<Service> services = p.getServices(); 
		for (Service service:services) {
//			if (service.equals(Service.JENKINS)) {
//				service.setAvailable(pingStatus.getStatus(GetPingStatus.JENKINS_URL, "admin", "admin"));
//			} else if (service.equals(Service.SONARQUBE)) {
//				service.setAvailable(pingStatus.getStatus(GetPingStatus.SONARQUBE_URL,null, null));
//			} else if(service.equals(Service.UCD) || service.equals(Service.UCV)){
//				service.setAvailable(true);
//			} else if(service.equals(Service.ASOC) || service.equals(Service.HFT) ){
//				service.setAvailable(false);
//			} else {
				service.setAvailable(true);	
//			}
		}
	}

}
