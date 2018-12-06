package com.hcl.dsecops.service;

import java.net.HttpURLConnection;
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
	
}