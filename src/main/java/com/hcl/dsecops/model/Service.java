package com.hcl.dsecops.model;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public class Service {
	private String code;
	private String displayName;
	private ServiceType serviceType;
	private ServiceCategory serviceCategory;
    private boolean available;
	
    public Service() {
    	
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
	
	public void setCode(String code) {
		this.code = code;
	}
	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}
	public void setServiceType(ServiceType serviceType) {
		this.serviceType = serviceType;
	}
	public void setServiceCategory(ServiceCategory serviceCategory) {
		this.serviceCategory = serviceCategory;
	}
	
	@Override
	public String toString() {
		return "Service [code=" + code + ", displayName=" + displayName + ", "
				+ "serviceCategory=" + serviceCategory+ " serviceType=" + serviceType+ "]";
	}
}


