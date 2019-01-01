package com.hcl.dsecops.controller;
 
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hcl.dsecops.PipelineUtil;
import com.hcl.dsecops.model.Capsule;
import com.hcl.dsecops.model.PipeLine;
import com.hcl.dsecops.model.Service;
import com.hcl.dsecops.model.ServiceType;
import com.hcl.dsecops.model.StatusPage;
import com.hcl.dsecops.model.ToolInfo;
import com.hcl.dsecops.model.ToolInfoFactory;
import com.hcl.dsecops.service.DeployToolChain;
 
@RestController
public class PipeLineController {
    
    @GetMapping("/api/capsules")
    public Capsule[] getCapsules() {
        System.out.println("PipeLineController.getCapsules()");
        return Capsule.values();
    }
 
    
    @GetMapping("/api/services")
    public List<List<Service>> getAvailableServices(@RequestParam("capsule") Capsule capsule) {
        System.out.println("PipeLineController.getAvailableServices()");
        System.out.println("PipeLineController.getAvailableServices() capsule "+capsule);
        List<List<Service>> services = new ArrayList<List<Service>>();
        if(capsule == Capsule.JAVA) {
            services.add(PipelineUtil.getStandardServices());
            services.add(PipelineUtil.getPremiumServices());
        } else if(capsule==Capsule.DOTNET) {
            services.add(PipelineUtil.getStandardServices());
        } else if (capsule==null) {
            services.add(PipelineUtil.getStandardServices());
            services.add(PipelineUtil.getPremiumServices());
        }
        return services;
    }
    
    @GetMapping("/api/createdPipelines")
    public List<PipeLine> getPipeline(){
    	List<PipeLine> pipeLineList = PipelineUtil.getPipelines();
    	PipelineUtil.updateServiceStatus(pipeLineList);
        return pipeLineList;
    }
    
    
    @PostMapping(path = "/api/installPipeline", consumes = "application/json")
    public void installPipeline(@RequestBody PipeLine pipeline){
    	ServiceType defaultServiceType = ServiceType.STANDARD;
        if(pipeline != null) {
            PipelineUtil.createPipeline(pipeline);
            defaultServiceType = pipeline.getServiceType();
        }
        new DeployToolChain().installPipeline(defaultServiceType);
    }
    
    @GetMapping("/api/installTool")
    public String installTool(@RequestParam("tool") String toolCode){
        if(toolCode == null) {
            return "";
        }
        return new DeployToolChain().installTool(toolCode);
    }
    
    @GetMapping("/api/installationLog")
    public String getInstallationLog() {
        return DeployToolChain.result.toString();
    }
    
    @GetMapping("/api/toolInfo")
    public ToolInfo getToolInfo(@RequestParam("toolCode") String toolCode ) {
        return new ToolInfoFactory().getToolInfo(toolCode);
    }
    
    @GetMapping("/api/autoInstallStatusStandard")
    public List<StatusPage> autoInstallStatusStandard() {
       return PipelineUtil.getAutoInstallStatusStandard();
    }
    
    @GetMapping("/api/autoInstallStatusPremium")
    public List<StatusPage> autoInstallStatusPremium() {
    	return PipelineUtil.getAutoInstallStatusPremium();
    }
    
    @GetMapping("/api/manualInstallStatusPremium")
    public List<StatusPage> manualInstallStatusPremium() {
       return PipelineUtil.getManualInstallStatusPremium();
    }
    @GetMapping("/api/manualInstallStatusStandard")
    public List<StatusPage> manualInstallStatusStandard() {
       return PipelineUtil.getManualInstallStatusStandard();
 
    }
    
}