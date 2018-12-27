package com.hcl.dsecops.model;

public class StatusPage {
	
	private String toolCode;
	public String getToolCode() {
		return toolCode;
	}

	public String getUserManualLink() {
		return userManualLink;
	}
	private String toolName;
	private Boolean installationStatus;
	private String userManualLink;
	private String toolLink;
	
	public StatusPage(String toolCode, String toolName,Boolean installationStatus, String actions,String toolLink) {
		this.toolCode = toolCode;
		this.toolName = toolName;
		this.installationStatus = installationStatus;
		this.userManualLink = actions;
		this.toolLink = toolLink;
	}
	
	public String getToolName() {
		return toolName;
	}
	
	public Boolean getInstallationStatus() {
		return installationStatus;
	}

	public void setInstallationStatus(Boolean installationStatus) {
		this.installationStatus = installationStatus;
	}

	public String getActions() {
		return userManualLink;
	}
	public String getToolLink() {
		return toolLink;
	}

}
