package com.hcl.dsecops.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public class PipeLine {

	private long pipeleineId;
	private String pipeleineName;
	private Capsule capsule;
	private List<Service> services;
	private ServiceType serviceType;

	public PipeLine() {
		
	}
	
	public PipeLine(long pipeleineId, String pipeleineName, Capsule capsule, List<Service> services) {
		super();
		this.pipeleineId = pipeleineId;
		this.pipeleineName = pipeleineName;
		this.capsule = capsule;
		this.services = services;
	}


	public Capsule getCapsule() {
		return capsule;
	}


	public void setCapsule(Capsule capsule) {
		this.capsule = capsule;
	}


	public long getPipeleineId() {
		return pipeleineId;
	}

	public void setPipeleineId(long pipeleineId) {
		this.pipeleineId = pipeleineId;
	}

	public String getPipeleineName() {
		return pipeleineName;
	}

	public void setPipeleineName(String pipeleineName) {
		this.pipeleineName = pipeleineName;
	}

	public List<Service> getServices() {
		return services;
	}

	public void setServices(List<Service> services) {
		this.services = services;
	}
	
	public ServiceType getServiceType() {
		return serviceType;
	}

	public void setServiceType(ServiceType serviceType) {
		this.serviceType = serviceType;
	}

	@Override
	public String toString() {
		return "PipeLine [pipeleineId=" + pipeleineId + ", pipeleineName=" + pipeleineName + ", capsule=" + capsule
				+ ", services=" + services + ", serviceType=" + serviceType + "]";
	}
	
}
