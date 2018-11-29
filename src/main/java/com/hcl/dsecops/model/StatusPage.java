package com.hcl.dsecops.model;

public class StatusPage {
	
	private String toolName;
	private Boolean installationStatus;
	private Boolean configurationStatus;
	private Boolean deployStatus;
	private String actions;
	private String toolLink;
	
	public StatusPage(String toolName,Boolean installationStatus,Boolean configurationStatus,
			Boolean deployStatus,String actions,String toolLink) {
		// TODO Auto-generated constructor stub
		this.toolName = toolName;
		this.installationStatus = installationStatus;
		this.configurationStatus = configurationStatus;
		this.deployStatus = deployStatus;
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

	public Boolean getConfigurationStatus() {
		return configurationStatus;
	}

	public void setConfigurationStatus(Boolean configurationStatus) {
		this.configurationStatus = configurationStatus;
	}

	public Boolean getDeployStatus() {
		return deployStatus;
	}

	public void setDeployStatus(Boolean deployStatus) {
		this.deployStatus = deployStatus;
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
