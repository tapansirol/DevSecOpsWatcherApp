package com.hcl.dsecops.model;

import java.util.List;

public class User {
	private Long userId;
	private String userName;
	private String role;
	private List<PipeLine> pipelines;
	
	public User(Long userId, String userName, String role, List<PipeLine> pipelines) {
		super();
		this.userId = userId;
		this.userName = userName;
		this.role = role;
		this.pipelines = pipelines;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public List<PipeLine> getPipelines() {
		return pipelines;
	}

	public void setPipelines(List<PipeLine> pipelines) {
		this.pipelines = pipelines;
	}
	
}
