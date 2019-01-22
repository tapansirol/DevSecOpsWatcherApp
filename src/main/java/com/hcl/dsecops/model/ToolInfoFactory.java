package com.hcl.dsecops.model;

import com.hcl.dsecops.PipelineUtil;
import com.hcl.dsecops.service.Configurations;

public class ToolInfoFactory {
	
	private static final String OPEN_BLANK = "_blank";
	private static final String RM = "9443/rm";
	private static final String CCM = "9443/ccm";
	private static final String QM = "9443/qm";
			
	private Configurations CONFIG = Configurations.getInstance();
	
	public ToolInfo getToolInfo(String toolCode) {
		if (toolCode==null || toolCode.isEmpty()) {
			return null;
		} 
		ToolInfo toolInfo = null;
		switch(toolCode) {
		case
		IService.JENKINS_CODE: 
			toolInfo = new ToolInfo(PipelineUtil.HOST+CONFIG.getJENKINS_PORT(),CONFIG.getJenkinsVersion(),PipelineUtil.JENKINS_DOC);
			break;
		case IService.UCD_CODE:
			toolInfo = new ToolInfo(PipelineUtil.SECUREHOST+CONFIG.getUCD_PORT(),CONFIG.getUCDVersion(),PipelineUtil.UCD_DOC );
			break;
		case IService.UCV_CODE:
			toolInfo = new ToolInfo(PipelineUtil.SECUREHOST+CONFIG.getUCV_PORT(),CONFIG.getUCVVersion(),PipelineUtil.UCV_DOC);
			break;
		case IService.SONARQUBE_CODE:
			toolInfo = new ToolInfo(PipelineUtil.HOST+CONFIG.getSONAR_PORT(),CONFIG.getSonarVersion(),PipelineUtil.SONAR_DOC);
			break;
		case IService.ASOC_CODE:
			toolInfo = new ToolInfo(CONFIG.getASOC_URL(),CONFIG.getASOCVersion(),PipelineUtil.ASOC_DOC);
			break;
		case IService.GITHUB_CODE:
			toolInfo = new ToolInfo(CONFIG.getGIT_REPO_URL(),CONFIG.getGitVersion(),PipelineUtil.GIT_DOC);
			break;
		case IService.HFT_CODE:
			toolInfo = new ToolInfo(OPEN_BLANK,CONFIG.getHFTVersion(),PipelineUtil.HFT_DOC);
			break;
		case IService.HOT_CODE:
			toolInfo = new ToolInfo(OPEN_BLANK,CONFIG.getHOTVersion(),PipelineUtil.ONE_TEST_DOC);
			break;
		case IService.RQM_CODE:
			toolInfo = new ToolInfo(PipelineUtil.SECUREHOST+QM,CONFIG.getCLMVersion(),PipelineUtil.CLM_DOC);
			break;

		case IService.RTC_CODE:
			toolInfo = new ToolInfo(PipelineUtil.SECUREHOST+CCM,CONFIG.getCLMVersion(),PipelineUtil.CLM_DOC);
			break;

		case IService.DOORS_NG_CODE:
			toolInfo = new ToolInfo(PipelineUtil.SECUREHOST+RM,CONFIG.getCLMVersion(),PipelineUtil.CLM_DOC);
			break;
		}

		return toolInfo;
	}
}
