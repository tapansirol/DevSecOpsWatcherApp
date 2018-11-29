package com.hcl.dsecops.service;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.SocketTimeoutException;
import java.net.URL;
import java.util.Base64;

public class GetPingStatus {
	public static String JENKINS_URL = "http://admin:admin@18.204.68.202:9292/login?from=%2F";
	public static String SONARQUBE_URL = "http://18.204.68.202:9000";
 
	public boolean getStatus(String url, String user, String password) {
 
		boolean result = false;
		int code = 200;
		try {
			URL siteURL = new URL(url);
			HttpURLConnection connection = (HttpURLConnection) siteURL.openConnection();
			if (user!=null & password!=null) {
				String userpass = user + ":" + password;
				String basicAuth = "Basic " + new String(Base64.getEncoder().encode(userpass.getBytes()));
				connection.setRequestProperty ("Authorization", basicAuth);
			}
			connection.setRequestMethod("GET");
			connection.setConnectTimeout(3000);
			connection.connect();
 
			code = connection.getResponseCode();
			if (code == 200) {
				result=true;
			} else {
				result = false;
			}
		} catch (Exception e) {
			result = false;
		}
		System.out.println(url + "\t\tStatus:" + result);
		return result;
	}
	
	/*public String isSiteUp(String url) {
		String result = "";
		int code = 200;
        try {
        	URL site = new URL(url);
            HttpURLConnection conn = (HttpURLConnection) site.openConnection();
            conn.getContent();
            if (conn.getResponseCode() == code) {
            	result = "-> Green <-\t" + "Code: " + code;
            } else {
            	result = "-> Yellow <-\t" + "Code: " + code;
            }
        } catch (SocketTimeoutException tout) {
        	result = "-> Red <-\t" + "Wrong domain - Exception: " + tout.getMessage();
        } catch (IOException ioex) {
            // You may decide on more specific behaviour...
        	result = "-> Red <-\t" + "Wrong domain - Exception: " + ioex.getMessage();
        }
        
        System.out.println(url + "\t\tStatus:" + result);
		return result;
      }
	
	public static void main(String args[]) throws Exception {
		 
		String[] hostList = { "http://18.204.68.202:9292/login?from=%2F", 
				"http://18.204.68.202:9000", "https://18.204.68.202:8443", "https://18.204.68.202",
				"http://18.204.68.202:8888/jpetstore/"};
		GetPingStatus pintStatus = new GetPingStatus();
		
		for (int i = 0; i < hostList.length; i++) {
 
			String url = hostList[i];
			pintStatus.isSiteUp(url);
 
		}
 
		System.out.println("Task completed...");
	}
 */
}