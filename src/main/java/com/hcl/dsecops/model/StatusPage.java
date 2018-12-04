package com.hcl.dsecops.model;

public class StatusPage {
	
	private String toolName;
	private Boolean installationStatus;
	private String actions;
	private String toolLink;
	
	public StatusPage(String toolName,Boolean installationStatus, String actions,String toolLink) {
		this.toolName = toolName;
		this.installationStatus = installationStatus;
		this.actions = actions;
		this.toolLink = toolLink;
	}
	
	public String getToolName() {
		return toolName;
	}
	public void setToolName(String toolName) {
		this.toolName = toolName;
	}
	
	public Boolean getInstallationStatus() {
		return installationStatus;
	}

	public void setInstallationStatus(Boolean installationStatus) {
		this.installationStatus = installationStatus;
	}

	public String getActions() {
		return actions;
	}
	public void setActions(String actions) {
		this.actions = actions;
	}
	public String getToolLink() {
		return toolLink;
	}
	public void setToolLink(String toolLink) {
		this.toolLink = toolLink;
	}
	
	

}
