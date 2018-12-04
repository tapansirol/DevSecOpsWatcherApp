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
import com.hcl.dsecops.model.ServiceType;
import com.hcl.dsecops.model.StandardToolChainServices;
import com.hcl.dsecops.model.StatusPage;
import com.hcl.dsecops.service.CheckToolsStatus;
import com.hcl.dsecops.service.DeployToolChain;

@RestController
public class PipeLineController {
	
	@GetMapping("/api/capsules")
	public Capsule[] getCapsules() {
		System.out.println("PipeLineController.getCapsules()");
		return Capsule.values();
	}

	@GetMapping("/api/availablePipelines")
	public List<PipeLine> getAvailablePipelines(@RequestParam("capsule") Capsule capsule) {
		System.out.println("PipeLineController.getAvailablePipelines()");
		System.out.println("PipeLineController.getAvailablePipelines() capsule "+capsule);
		List<IService> standardServices = Arrays.asList(StandardToolChainServices.values());
		List<IService> premiumServices = Arrays.asList(PremiumToolChainServices.values());
		List<PipeLine> services = new ArrayList<PipeLine>();
		PipeLine standard = new PipeLine();
		standard.setCapsule(capsule);
		PipeLine premium = new PipeLine();
		premium.setCapsule(capsule);
		if(capsule == Capsule.JAVA) {
			standard.setServices(standardServices);
			premium.setServices(premiumServices);
			services.add(standard);
			services.add(premium);
		} else if(capsule==Capsule.DOTNET) {
			standard.setServices(standardServices);
			services.add(standard);
		} else {
			standard.setServices(standardServices);
			premium.setServices(premiumServices);
			services.add(standard);
			services.add(premium);
		}
		return services;
	}
	
	@GetMapping("/api/createdPipelines")
	public List<PipeLine> getPipeline(){
		return PipelineUtil.getPipelines();
	}
	
	@PostMapping(path = "/api/installPipeline", consumes = "application/json", produces = "application/text")
	public String installPipeline(@RequestBody PipeLine pipeline){
		if(pipeline != null) {
			PipelineUtil.createPipeline(pipeline);
		}
		return new DeployToolChain().installPipeline();
	}
	
	@PostMapping(path = "/api/installTool", consumes = "application/json", produces = "application/text")
	public String installTool(@RequestBody StatusPage statusPage){
		if(statusPage == null) {
			return "";
		}
		return new DeployToolChain().installTool(statusPage.getToolName());
	}
	
	
	@GetMapping("/api/status")
	public List<StatusPage> getStatus() {
		List<StatusPage> statusPages = new ArrayList<>();
		CheckToolsStatus status = new CheckToolsStatus();
		statusPages.add(new StatusPage("Jenkins",status.isToolAlive("http://35.174.141.72:8082"),"Jenkins_Link",
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