package com.hcl.dsecops.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;    

public class RemoteScriptExec {

    public static void main(String[] args) {

        JSch jsch = new JSch();

        Session session;
        try {
        	
        	jsch.addIdentity("C:\\Demo-SLT-ubuntu.pem");

            // Open a Session to remote SSH server and Connect.
            // Set User and IP of the remote host and SSH port.
//            session = jsch.getSession("ubuntu", "34.234.131.215", 22);
        	session = jsch.getSession("ubuntu", "18.204.68.202", 22);
        	
        	
        	
//        	session = jsch.getSession("tapan", "192.168.245.132", 22);
            
            // When we do SSH to a remote host for the 1st time or if key at the remote host 
            // changes, we will be prompted to confirm the authenticity of remote host. 
            // This check feature is controlled by StrictHostKeyChecking ssh parameter. 
            // By default StrictHostKeyChecking  is set to yes as a security measure.
            session.setConfig("StrictHostKeyChecking", "no");
            //Set password
//            session.setPassword("tapan123");
//            session.setTimeout(100000);
            System.out.println("User Name ---->" +session.getUserName());
            System.out.println(" Host ---->" +session.getHost());
            session.connect();
            
            session.setServerAliveCountMax(30);

            // create the execution channel over the session
            ChannelExec channelExec = (ChannelExec) session.openChannel("exec");
            // Set the command to execute on the channel and execute the command
            
            channelExec.setCommand("sh /home/ubuntu/Jagan/startup.sh");
            channelExec.connect();
            
            // Get an InputStream from this channel and read messages, generated 
            // by the executing command, from the remote side.
//            InputStream in = channelExec.getInputStream();
            
            InputStream in = channelExec.getExtInputStream();
            
            BufferedReader reader = new BufferedReader(new InputStreamReader(in));
            String line;
//            int sleepCount=0;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
//                try {
//                    Thread.sleep(1000);
//                } catch (InterruptedException e) {
//                    System.out.println("Interrupted exception while waiting for command sh /home/ubuntu/Jagan/startup.sh to finish -->" + e);
//                }
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

    }
}