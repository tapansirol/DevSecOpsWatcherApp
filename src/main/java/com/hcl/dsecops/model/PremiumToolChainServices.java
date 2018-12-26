package com.hcl.dsecops.model;

import java.util.Arrays;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum PremiumToolChainServices implements IService {
	//maintain below sequence to adhere to UI Pipelines
	DNG(DOORS_NG_CODE, DOORS_NG_DESC, ServiceType.PREMIUM, ServiceCategory.PLANANDMEASURE, false),
	RTC(RTC_CODE, RTC_DESC, ServiceType.PREMIUM, ServiceCategory.PLANANDMEASURE,false),
	JENKINS(JENKINS_CODE, JENKINS_DESC, ServiceType.PREMIUM, ServiceCategory.DEVELOPANDTEST, false), 
	ASOC(ASOC_CODE, ASOC_DESC, ServiceType.PREMIUM, ServiceCategory.DEVELOPANDTEST, false),
	RQM(RQM_CODE, RQM_DESC, ServiceType.PREMIUM, ServiceCategory.DEVELOPANDTEST, false), 
	HFT(HFT_CODE, HFT_DESC, ServiceType.PREMIUM, ServiceCategory.DEVELOPANDTEST, false), 
	UCD(UCD_CODE, UCD_DESC, ServiceType.PREMIUM, ServiceCategory.RELEASEANDDEPLOY, false),
	UCV(UCV_CODE, UCV_DESC, ServiceType.PREMIUM, ServiceCategory.RELEASEANDDEPLOY, false);
	
	private String code;
	private String displayName;
	private ServiceType serviceType;
	private ServiceCategory serviceCategory;
    private boolean available;
	
	private PremiumToolChainServices(String code, String displayName, ServiceType serviceType, ServiceCategory serviceCategory, boolean available) {
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
	static PremiumToolChainServices findValue(@JsonProperty("code") String code, @JsonProperty("displayName") String displayName){
		return Arrays.stream(PremiumToolChainServices.values()).filter(v -> v.code.equals(code) && v.displayName.equals(displayName)).findFirst().get();
	}
	
	@Override
	public String toString() {
		return "Service [code=" + code + ", displayName=" + displayName + ", "
				+ "serviceCategory=" + serviceCategory+ " serviceType=" + serviceType+ "]";
	}
	
}


