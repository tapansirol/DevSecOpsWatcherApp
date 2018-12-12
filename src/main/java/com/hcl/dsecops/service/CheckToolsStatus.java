package com.hcl.dsecops.service;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.X509Certificate;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

/**
 * Class for checking status of tools(Tools which are ruunig as a web
 * application like ucd, ucd, jenkins and sonar).
 * To check service status it sends http/https request to passed url and
 * on the basis of response it decide server is up or not
 * 
 * @author Tapan Sirole
 * 
 */
public class CheckToolsStatus {
	private final String HTTP = "http";
	private final String HTTPS = "https";
	private final String REQUEST_METHOD = "HEAD";
	private int timeout = 2000;

	/**
	 * This method checks whether particular service up or not.
	 * To check service status it sends http/https request to passed url and
	 * on the basis of response it decide server is up or not
	 * @param url
	 * @return
	 */
	public boolean isToolAlive(String url){
		return isToolAlive(url, timeout);
	}
	
	/**
	 * This method checks whether particular service up or not.
	 * To check service status it sends http/https request to passed url and
	 * on the basis of response it decide server is up or not
	 * @param url
	 * @param timeOut
	 * @return boolean
	 */
	public boolean isToolAlive(String url, int timeOut) {
		int responseCode = -1;
		System.out.println("URLS :"+url);
		try {
			if(isHttpsUrl(url))
			{
				System.out.println("Inside HTTPS URL "+url);
				responseCode = sendHttpsRequest(url, timeOut);
			}
			else
			{
				System.out.println("Inside HTTP URL "+url);
			    responseCode = sendHttpRequest(url, timeOut);
			}
		
			System.out.println("Response Code :"+responseCode+"   --->"+url);
			if (responseCode == 200 || responseCode == 401 || responseCode == 403) {
				return true;
			}
			
		} catch (IOException exception) {
			return false;
		} catch (KeyManagementException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return false;
	}

	/**
	 * This method check whether passed url is of https type or not. If url is
	 * https type it return true, otherwise it returns false
	 * 
	 * @param url
	 * @return boolean
	 */
	private boolean isHttpsUrl(String url) {
		if (url == null || url.length() <= 0)
			return false;
		
		return url.contains(HTTPS);
	}

	/**
	 * This method sends https request to passed url and return response code.
	 * @param url
	 * @param timeOut
	 * @return int
	 * @throws MalformedURLException
	 * @throws IOException
	 * @throws NoSuchAlgorithmException 
	 * @throws KeyManagementException 
	 */
	private int sendHttpsRequest(String url, int timeOut)
			throws MalformedURLException, IOException, NoSuchAlgorithmException, KeyManagementException {
		 TrustManager[] trustAllCerts = new TrustManager[] {new X509TrustManager() {
             public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                 return null;
             }
             public void checkClientTrusted(X509Certificate[] certs, String authType) {
             }
             public void checkServerTrusted(X509Certificate[] certs, String authType) {
             }
         }
     };

     // Install the all-trusting trust manager
     SSLContext sc = SSLContext.getInstance("SSL");
     sc.init(null, trustAllCerts, new java.security.SecureRandom());
     HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());

     // Create all-trusting host name verifier
     HostnameVerifier allHostsValid = new HostnameVerifier() {
         public boolean verify(String hostname, SSLSession session) {
             return true;
         }
     };

     // Install the all-trusting host verifier
     HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);

     URL uri = new URL(url);
     HttpsURLConnection con = (HttpsURLConnection)uri.openConnection();
     int status = con.getResponseCode();
     
     return status;
	}

	/**
	 * This method sends http request to passed url and return response code
	 * It uses Request method of type HEAD
	 * @param url
	 * @param timeOut
	 * @return int
	 * @throws MalformedURLException
	 * @throws IOException
	 */
	private int sendHttpRequest(String url, int timeOut)
			throws MalformedURLException, IOException {
		
		HttpURLConnection connection = (HttpURLConnection) new URL(url)
				.openConnection();
		connection.setConnectTimeout(timeOut);
		connection.setReadTimeout(timeOut);
		connection.setRequestMethod(REQUEST_METHOD);
		int responseCode = connection.getResponseCode();
		System.out.println("Res ==>"+url+"  --->"+responseCode);
		return responseCode;
	}

	/**
	 * Driver method to check working of above functions
	 * @param args
	 */
	public static void main(String[] args) {
		CheckToolsStatus chkToolStatus = new CheckToolsStatus();
		String url = "http://10.134.43.155:9292";
		System.out.println("isAlive : " + chkToolStatus.isToolAlive(url));
	}
}
