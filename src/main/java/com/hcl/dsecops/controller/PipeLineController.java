package com.hcl.dsecops.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hcl.dsecops.PipelineUtil;
import com.hcl.dsecops.model.Capsule;
import com.hcl.dsecops.model.IService;
import com.hcl.dsecops.model.PipeLine;
import com.hcl.dsecops.model.PremiumToolChainServices;
import com.hcl.dsecops.model.StandardToolChainServices;
import com.hcl.dsecops.model.StatusPage;
import com.hcl.dsecops.model.ToolInfo;
import com.hcl.dsecops.model.ToolInfoFactory;
import com.hcl.dsecops.service.CheckToolsStatus;
import com.hcl.dsecops.service.DeployToolChain;

@RestController
public class PipeLineController {
	
	@GetMapping("/api/capsules")
	public Capsule[] getCapsules() {
		System.out.println("PipeLineController.getCapsules()");
		return Capsule.values();
	}

//	@GetMapping("/api/availablePipelines")
//	public List<PipeLine> getAvailablePipelines(@RequestParam("capsule") Capsule capsule) {
//		System.out.println("PipeLineController.getAvailablePipelines()");
//		System.out.println("PipeLineController.getAvailablePipelines() capsule "+capsule);
//		List<IService> standardServices = Arrays.asList(StandardToolChainServices.values());
//		List<IService> premiumServices = Arrays.asList(PremiumToolChainServices.values());
//		List<PipeLine> services = new ArrayList<PipeLine>();
//		PipeLine standard = new PipeLine();
//		standard.setCapsule(capsule);
//		PipeLine premium = new PipeLine();
//		premium.setCapsule(capsule);
//		if(capsule == Capsule.JAVA) {
//			standard.setServices(standardServices);
//			premium.setServices(premiumServices);
//			services.add(standard);
//			services.add(premium);
//		} else if(capsule==Capsule.DOTNET) {
//			standard.setServices(standardServices);
//			services.add(standard);
//		} else {
//			standard.setServices(standardServices);
//			premium.setServices(premiumServices);
//			services.add(standard);
//			services.add(premium);
//		}
//		return services;
//	}
	
	@GetMapping("/api/services")
	public List<List<IService>> getAvailableServices(@RequestParam("capsule") Capsule capsule) {
		System.out.println("PipeLineController.getAvailableServices()");
		System.out.println("PipeLineController.getAvailableServices() capsule "+capsule);
		List<IService> standardServices = Arrays.asList(StandardToolChainServices.values());
		List<IService> premiumServices = Arrays.asList(PremiumToolChainServices.values());
		List<List<IService>> services = new ArrayList<List<IService>>();
		if(capsule == Capsule.JAVA) {
			services.add(standardServices);
			services.add(premiumServices);
		} else if(capsule==Capsule.DOTNET) {
			services.add(standardServices);
		} else if (capsule==null) {
			services.add(standardServices);
			services.add(premiumServices);
		}
		return services;
	}
	
	@GetMapping("/api/createdPipelines")
	public List<PipeLine> getPipeline(){
		return PipelineUtil.getPipelines();
	}
	
	/*@PostMapping(path = "/api/installPipeline", consumes = "application/json", produces = "application/text")
	public String installPipeline(@RequestBody PipeLine pipeline){
		if(pipeline != null) {
			PipelineUtil.createPipeline(pipeline);
		}
		return new DeployToolChain().installPipeline();
	}*/
	
	
	@PostMapping(path = "/api/installPipeline", consumes = "application/json")
	public void installPipeline(@RequestBody PipeLine pipeline){
		if(pipeline != null) {
			PipelineUtil.createPipeline(pipeline);
		}
		new DeployToolChain().installPipeline();
	}
	
	@PostMapping(path = "/api/installTool", consumes = "application/json", produces = "application/text")
	public String installTool(@RequestBody StatusPage statusPage){
		if(statusPage == null) {
			return "";
		}
		return new DeployToolChain().installTool(statusPage.getToolName());
	}
	
	@GetMapping("/api/installationLog")
    public String getInstallationLog() {
		return new DeployToolChain().getProcessResult();
	}
	
	@GetMapping("/api/tooInfo")
    public ToolInfo getToolInfo(@RequestParam("toolCode") String toolCode ) {
		return new ToolInfoFactory().getToolInfo(toolCode);
	}
	
	@GetMapping("/api/status")
    public List<StatusPage> getStatus() {
        List<StatusPage> statusPages = new ArrayList<>();
        CheckToolsStatus status = new CheckToolsStatus();
        statusPages.add(new StatusPage("Jenkins",true,"https://jenkins.io/doc/",
                "Jenkins_tool_Link"));
        statusPages.add(new StatusPage("UrbanCode Deploy",true,
                "https://www.ibm.com/support/knowledgecenter/en/SS4GSP_6.2.0/com.ibm.udeploy.doc/ucd_version_welcome.html",
                "UrbanCode_Deploy_tool_Link"));
        statusPages.add(new StatusPage("UrbanCode_Velocity",true,
                "https://www.ibm.com/support/knowledgecenter/en/SSCKX6_1.0.0/com.ibm.uvelocity.doc/ucv_version_welcome.html",
                "UrbanCode_Velocity_tool_Link"));
        statusPages.add(new StatusPage("SonarQube",true,
                "https://docs.sonarqube.org/latest/",
                "Jenkins_tool_Link"));
        statusPages.add(new StatusPage("AppScan",true,
                "https://www.ibm.com/support/knowledgecenter/en/SSPH29_9.0.3/com.ibm.help.common.infocenter.aps/helpindex_appscan.html",
                "AppScan_tool_Link"));
        return statusPages;
    }
	
	@GetMapping("/api/statusPremiumToolChain")
	public List<StatusPage> getSetupForToolChain() {
		List<StatusPage> statusPages = new ArrayList<>();
		statusPages.add(new StatusPage("Doors",false,"Doors_Link",
				"DOORS_tool_Link"));
		statusPages.add(new StatusPage("RQM",false,"RQM_Link",
				"RQM_tool_Link"));
		statusPages.add(new StatusPage("RTC",true,"RTC_Link",
				"RTC_tool_Link"));
		statusPages.add(new StatusPage("Jenkins",true,"Jenkins_Link",
				"Jenkins_tool_Link"));
		statusPages.add(new StatusPage("UrbanCode Deploy",true,"UrbanCode_Deploy_Link",
				"UrbanCode_Deploy_tool_Link"));
		statusPages.add(new StatusPage("UrbanCode_Velocity",false,"UrbanCode_Velocity_Link",
				"UrbanCode_Velocity_tool_Link"));
		statusPages.add(new StatusPage("SonarQube",true,"Jenkins_Link",
				"Jenkins_tool_Link"));
		statusPages.add(new StatusPage("AppScan",true,"AppScan_Link",
				"AppScan_tool_Link"));
		statusPages.add(new StatusPage("HCL Functional Tester",false,"HFT_Link",
				"HFT_tool_Link"));
		
		
		return statusPages;
	}
	
}