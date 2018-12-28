package com.hcl.dsecops.model;

import com.hcl.dsecops.service.Configurations;

public class ToolInfoFactory {

	public ToolInfo getToolInfo(String toolCode) {
		if (toolCode==null || toolCode.isEmpty()) {
			return null;
		} 
		String host = Configurations.getInstance().getIP();
		ToolInfo toolInfo = null;
		switch(toolCode) {
		case
		IService.JENKINS_CODE: 
			toolInfo = new ToolInfo("http://"+host+":9292","2.121.3","https://jenkins.io/doc/");
			break;
		case IService.UCD_CODE:
			toolInfo = new ToolInfo("https://"+host+":"+Configurations.getInstance().getUCD_PORT(),"1.0.0","https://www.ibm.com/support/knowledgecenter/en/SS4GSP_6.2.0/com.ibm.udeploy.doc/ucd_version_welcome.html");
			break;
		case IService.UCV_CODE:
			toolInfo = new ToolInfo("https://"+host+":"+Configurations.getInstance().getUCV_PORT(),"1.0.0","https://www.ibm.com/support/knowledgecenter/en/SSCKX6_1.0.0/com.ibm.uvelocity.doc/ucv_version_welcome.html");
			break;
		case IService.SONARQUBE_CODE:
			toolInfo = new ToolInfo("http://"+host+":"+Configurations.getInstance().getSONAR_PORT(),"7.4","https://docs.sonarqube.org/latest/");
			break;
		case IService.ASOC_CODE:
			toolInfo = new ToolInfo("https://stage.appscan.ibmcloud.com/AsoCUI/serviceui/home","1.0.0","https://www.ibm.com/support/knowledgecenter/SSYJJF_1.0.0/ApplicationSecurityonCloud/Welcome.html");
			break;
		case IService.GITHUB_CODE:
			toolInfo = new ToolInfo("https://github.com/tapansirol/jpet-store","2.1","https://guides.github.com/");
			break;
		case IService.HFT_CODE:
			toolInfo = new ToolInfo("_blank","9.2.0","https://www.ibm.com/support/knowledgecenter/SSJMXE_9.2.0/com.ibm.rational.test.ft.doc/rft_welcome.html");
			break;

		case IService.RQM_CODE:
			toolInfo = new ToolInfo("https://"+host+":9443/qm","6.0.6","https://jazz.net/help-dev/clm/index.jsp?topic=%2Fcom.ibm.rational.test.qm.doc%2Ftopics%2Fc_qm_overview.html");
			break;

		case IService.RTC_CODE:
			toolInfo = new ToolInfo("https://"+host+":9443/ccm","6.0.6","https://jazz.net/help-dev/clm/index.jsp?topic=%2Fcom.ibm.rational.test.qm.doc%2Ftopics%2Fc_qm_overview.html");
			break;

		case IService.DOORS_NG_CODE:
			toolInfo = new ToolInfo("https://"+host+":9443/rm","6.0.6","https://jazz.net/help-dev/clm/index.jsp?topic=%2Fcom.ibm.rational.test.qm.doc%2Ftopics%2Fc_qm_overview.html");
			break;
		}

		return toolInfo;
	}
}
