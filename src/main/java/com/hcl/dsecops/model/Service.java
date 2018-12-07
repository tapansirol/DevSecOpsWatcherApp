package com.hcl.dsecops.model;

import java.util.Arrays;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum Service {
	//maintain below sequence to adhere to UI Pipelines
	RTC("RTC", "Rational Team Concert", ServiceType.PREMIUM, ServiceCategory.PLANANDMEASURE,false),
	DNG("DNG", "Doors NG", ServiceType.PREMIUM, ServiceCategory.PLANANDMEASURE, true),
	GITHUB("GITHUB", "Github", ServiceType.STANDARD, ServiceCategory.DEVELOPANDTEST, true), 
	JENKINS("JENKINS", "Jenkins", ServiceType.BOTH, ServiceCategory.DEVELOPANDTEST, true), 
	HFT("HFT", "HCL Functional Tester", ServiceType.BOTH, ServiceCategory.DEVELOPANDTEST, true), /*for Standard Tool Chain*/
	SONARQUBE("SONARQUBE", "Sonarqube", ServiceType.BOTH, ServiceCategory.DEVELOPANDTEST, false), 
	ASOC("ASOC", "AppScan on Cloud", ServiceType.BOTH, ServiceCategory.DEVELOPANDTEST, true), 
	RQM("RQM", "Rational Quality Manager", ServiceType.BOTH, ServiceCategory.DEVELOPANDTEST, false), 
	HOTUI("HOTUI", "HCL One Test UI", ServiceType.BOTH, ServiceCategory.DEVELOPANDTEST, true), 
	HOTPT("HOTPT", "HCL One Test Performance Tester", ServiceType.PREMIUM, ServiceCategory.DEVELOPANDTEST, true), /*jenkins, ucv, ucd, asoc for Premium Tool Chain*/ 
	UCD("UCD", "Urban Code Deploy", ServiceType.BOTH, ServiceCategory.RELEASEANDDEPLOY, true),
	UCV("UCV", "Urban Code Velocity", ServiceType.BOTH, ServiceCategory.RELEASEANDDEPLOY, true);
	 
	 
	
	private String code;
	private String displayName;
	private ServiceType serviceType;
	private ServiceCategory serviceCategory;
    private boolean available;
	
	  
	private Service(String code, String displayName, ServiceType serviceType, ServiceCategory serviceCategory, boolean available) {
		this.code = code;
		this.displayName = displayName;
		this.serviceType = serviceType;
		this.serviceCategory = serviceCategory;
		this.available = available;
	}
	
	public ServiceType getServiceType() {
		return serviceType;
	}
	
	public ServiceCategory getServiceCategory() {
		return serviceCategory;
	}

	public String getDisplayName() {
	      return displayName;
	}  
	
	public String getCode() {
	      return code;
	}  
	
	public boolean isAvailable() {
		return available;
	}

	public void setAvailable(boolean available) {
		this.available = available;
	}

	@JsonCreator
	static Service findValue(@JsonProperty("code") String code, @JsonProperty("displayName") String displayName){
		return Arrays.stream(Service.values()).filter(v -> v.code.equals(code) && v.displayName.equals(displayName)).findFirst().get();
	}
	
	
	@Override
	public String toString() {
		return "Service [code=" + code + ", displayName=" + displayName + ", "
				+ "serviceCategory=" + serviceCategory+ " serviceType=" + serviceType+ "]";
	}
	
	public static enum ServiceCategory {
		PLANANDMEASURE, DEVELOPANDTEST, RELEASEANDDEPLOY;
	}

	public static enum ServiceType {
		STANDARD, PREMIUM, BOTH;
	}
}


