package com.hcl.dsecops.service;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.InetAddress;
import java.net.URL;
import java.net.UnknownHostException;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.model.Container;
import com.github.dockerjava.core.DockerClientBuilder;

public class CheckPingStatusOfURLMain {

	public static void main(String args[]) throws Exception {
		 
		String status1 = getStatus("https://devops-live.hcltech.com/ucd/");
//		String status1 = getStatus("https://www.java2blog.com");
		System.out.println("Java2blog.com is : " + status1);
 
		String status2 = getStatus("http://www.javablog2.com");
		System.out.println("javablog2.com is : " + status2);
 
	}
 
	public static String getStatus(String url) throws IOException {
 
		String result = "";
		try {
			URL urlObj = new URL(url);
			HttpURLConnection con = (HttpURLConnection) urlObj.openConnection();
			con.setRequestMethod("GET");
                        // Set connection timeout
			con.setConnectTimeout(3000);
			con.connect();
 
			int code = con.getResponseCode();
			if (code == 200) {
				result = "On";
			}
		} catch (Exception e) {
			result = "Off";
		}
		return result;
	}
	
//	public static void main(String args[]) {
//	     try {
//	       InetAddress address = InetAddress.getByName("http://18.204.68.202:9000");
//	       System.out.println("Name: " + address.getHostName());
//	       System.out.println("Addr: " + address.getHostAddress());
//	       System.out.println("Reach: " + address.isReachable(3000));
//	     }
//	     catch (UnknownHostException e) {
//	       System.err.println("Unable to lookup 18.204.68.202");
//	     }
//	     catch (IOException e) {
//	       System.err.println("Unable to reach 18.204.68.202");
//	     }
//	   }
	
//	public static void main(String args[]) {
//		DockerClient dockerClient = DockerClientBuilder.getInstance("https://18.204.68.202").build();
//
//
//		Container newContainer = dockerClient.listContainersCmd().exec().get(0);
//		System.out.println(newContainer.getId());
//		System.out.println(newContainer.getStatus());
//		System.out.println(newContainer.toString());
//
//
//	}
}
