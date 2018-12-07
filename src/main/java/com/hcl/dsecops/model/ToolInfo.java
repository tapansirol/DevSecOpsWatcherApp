package com.hcl.dsecops.model;

public class ToolInfo {

	private String toolURL;
	private String toolVersion;
	private String helpURL;
	
	public ToolInfo(String toolURL, String toolVersion, String helpURL) {
		super();
		this.toolURL = toolURL;
		this.toolVersion = toolVersion;
		this.helpURL = helpURL;
	}
	
	public String getToolURL() {
		return toolURL;
	}
	public String getToolVersion() {
		return toolVersion;
	}
	public String getHelpURL() {
		return helpURL;
	}
	
}
