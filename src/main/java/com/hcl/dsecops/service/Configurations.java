package com.hcl.dsecops.service;

import java.util.Properties;

public class Configurations {

	private Properties props;
	private static Configurations configs;
	
	public static Configurations getInstance() {
		if (configs==null) {
			configs = new Configurations();
		}
		return configs;
	}
	
	private Configurations() {
		
	}
	
	public void setProperties(Properties props) {
		this.props = props;
	}
	
	private String getProperty(String prop) {
		String result = "";
		if (props!=null) {
			result = props.getProperty(prop);
		}
		return result;
	}
	
	public String getHOME_PATH() {
		return  getProperty("HOME_PATH");
	}
	
	public String getHOST_IP() {
		return  getProperty("HOST_IP");
	}
	public String getHOST_MACHINE_USER_NAME() {
		return getProperty("HOST_MACHINE_USER_NAME");
	}
	public String getSONAR_SERVER_URL() {
		return  getProperty("SONAR_SERVER_URL");
	}
	public String getJENKINS_JOB_NAME() {
		return  getProperty("JENKINS_JOB_NAME");
	}
	public String getJENKINS_JOB_DESCRIPTION() {
		return  getProperty("JENKINS_JOB_DESCRIPTION");
	}
	public String getGIT_REPO_URL() {
		return  getProperty("GIT_REPO_URL");
	}
	public String getGIT_USER_NAME() {
		return  getProperty("GIT_USER_NAME");
	}
	public String getGIT_CREDENTIAL_ID() {
		return  getProperty("GIT_CREDENTIAL_ID");
	}
	public String getGIT_BRANCH() {
		return  getProperty("GIT_BRANCH");
	}
	public String getGIT_TOKEN() {
		return  getProperty("GIT_TOKEN");
	}
	public String getUCD_PORT() {
		return  getProperty("UCD_PORT");
	}
	public String getUCV_PORT() {
		return  getProperty("UCV_PORT");
	}
	public String getSONAR_PORT() {
		return  getProperty("SONAR_PORT");
	}
	public String getJENKINS_PORT() {
		return  getProperty("JENKINS_PORT");
	}
	public String getUCV_USER_NAME() {
		return  getProperty("UCV_USER_NAME");
	}
	public String getUCV_PASSWORD() {
		return  getProperty("UCV_PASSWORD");
	}
	public String getASOC_URL() {
		return getProperty("ASOC_URL");
	}
	public String getASOC_ID() {
		return  getProperty("ASOC_ID");
	}
	public String getASOC_SECRET() {
		return  getProperty("ASOC_SECRET");
	}
	public String getStartupStandard() {
		return  getProperty("startup_standard");
	}
	public String getStartupPremium() {
		return  getProperty("startup_premium");
	}
	public String getJenkins_script() {
		return  getProperty("jenkins_script");
	}
	public String getSonar_script() {
		return  getProperty("sonar_script");
	}
	public String getVelocity_script() {
		return  getProperty("velocity_script");
	}
	public String getuDeploy_script() {
		return  getProperty("uDeploy_script");
	}
	public String getCleanup() {
		return  getProperty("cleanup");
	}
	public String getStop_services() {
		return getProperty("stop-services");
	}

	public String getJenkinsVersion() {
		return getProperty("JENKINS_VERSION");
	}
	public String getUCDVersion() {
		return getProperty("UCD_VERSION");
	}
	
	public String getUCVVersion() {
		return getProperty("UCV_VERSION");
	}
	
	public String getSonarVersion() {
		return getProperty("SONAR_VERSION");
	}
	
	public String getASOCVersion() {
		return getProperty("ASOC_VERSION");
	}
	
	public String getGitVersion() {
		return getProperty("GIT_VERSION");
	}
	
	public String getHFTVersion() {
		return getProperty("HFT_VERSION");
	}
	
	public String getHOTVersion() {
		return getProperty("HOT_VERSION");
	}
	
	public String getCLMVersion() {
		return getProperty("CLM_VERSION");
	}
	
}
