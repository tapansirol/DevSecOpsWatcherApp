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
import com.hcl.dsecops.model.Service;
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
	
	@GetMapping("/api/pipelines")
	public List<PipeLine> getPipeline(){
		return PipelineUtil.getPipelines();
	}
	
	@PostMapping(path = "/api/installPipeline", consumes = "application/json", produces = "application/json")
	public String installPipeline(@RequestBody PipeLine pipeline){
		if(pipeline != null) {
			PipelineUtil.createPipeline(pipeline);
		}
		return new DeployToolChain().deploy();
	}
	
	@GetMapping("/api/status")
	public List<StatusPage> getSetup() {
		List<StatusPage> statusPages = new ArrayList<>();
		CheckToolsStatus status = new CheckToolsStatus();
		statusPages.add(new StatusPage("Jenkins",true,true,status.isToolAlive("http://35.174.141.72:8082"),"Jenkins_Link",
				"Jenkins_tool_Link"));
		statusPages.add(new StatusPage("UrbanCode Deploy",true,false,true,"UrbanCode_Deploy_Link",
				"UrbanCode_Deploy_tool_Link"));
		statusPages.add(new StatusPage("UrbanCode_Velocity",false,false,false,"UrbanCode_Velocity_Link",
				"UrbanCode_Velocity_tool_Link"));
		statusPages.add(new StatusPage("SonarQube",true,false,true,"Jenkins_Link",
				"Jenkins_tool_Link"));
		statusPages.add(new StatusPage("AppScan",false,false,true,"AppScan_Link",
				"AppScan_tool_Link"));
		statusPages.add(new StatusPage("HCL Functional Tester",true,false,false,"HFT_Link",
				"HFT_tool_Link"));
		
		return statusPages;
	}
	
	@GetMapping("/api/statusPremiumToolChain")
	public List<StatusPage> getSetupForToolChain() {
		List<StatusPage> statusPages = new ArrayList<>();
		statusPages.add(new StatusPage("Doors",true,false,false,"Doors_Link",
				"DOORS_tool_Link"));
		statusPages.add(new StatusPage("RQM",true,false,false,"RQM_Link",
				"RQM_tool_Link"));
		statusPages.add(new StatusPage("RTC",true,false,true,"RTC_Link",
				"RTC_tool_Link"));
		statusPages.add(new StatusPage("Jenkins",true,true,true,"Jenkins_Link",
				"Jenkins_tool_Link"));
		statusPages.add(new StatusPage("UrbanCode Deploy",true,false,true,"UrbanCode_Deploy_Link",
				"UrbanCode_Deploy_tool_Link"));
		statusPages.add(new StatusPage("UrbanCode_Velocity",false,false,false,"UrbanCode_Velocity_Link",
				"UrbanCode_Velocity_tool_Link"));
		statusPages.add(new StatusPage("SonarQube",true,false,true,"Jenkins_Link",
				"Jenkins_tool_Link"));
		statusPages.add(new StatusPage("AppScan",false,false,true,"AppScan_Link",
				"AppScan_tool_Link"));
		statusPages.add(new StatusPage("HCL Functional Tester",true,false,false,"HFT_Link",
				"HFT_tool_Link"));
		
		
		return statusPages;
	}
	
	public static void main(String[] args) {
		Service service = Service.ASOC;
		if (service.getServiceCategory() == Service.ServiceCategory.DEVELOPANDTEST) {
			System.out.println();
		}
	}
}