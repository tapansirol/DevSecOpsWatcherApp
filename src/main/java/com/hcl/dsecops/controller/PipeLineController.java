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
import com.hcl.dsecops.model.StatusPage;
import com.hcl.dsecops.model.ToolInfo;
import com.hcl.dsecops.model.ToolInfoFactory;
import com.hcl.dsecops.service.CheckToolsStatus;
import com.hcl.dsecops.service.Configurations;
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
        return PipelineUtil.getPipelines();
    }
    
    
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
        return DeployToolChain.result.toString();
    }
    
    @GetMapping("/api/toolInfo")
    public ToolInfo getToolInfo(@RequestParam("toolCode") String toolCode ) {
        return new ToolInfoFactory().getToolInfo(toolCode);
    }
    
    @GetMapping("/api/status")
    public List<StatusPage> getStatus() {
        List<StatusPage> statusPages = new ArrayList<>();
        CheckToolsStatus status = new CheckToolsStatus();
        String host = Configurations.getInstance().getIP();       
        
        statusPages.add(new StatusPage("Jenkins",true,"https://jenkins.io/doc/",
                "http://"+host+":9292"));
        System.out.println("Jenkins Link :"+status.isToolAlive("http://"+host+":9292")+"  -->"+host);
        
        statusPages.add(new StatusPage("UrbanCode Deploy",true,
                "https://www.ibm.com/support/knowledgecenter/en/SS4GSP_6.2.0/com.ibm.udeploy.doc/ucd_version_welcome.html",
                "https://"+host+":"+Configurations.getInstance().getUCD_PORT()));
        statusPages.add(new StatusPage("UrbanCode_Velocity",status.isToolAlive( "https://"+host+":"+Configurations.getInstance().getUCV_PORT()),
                "https://www.ibm.com/support/knowledgecenter/en/SSCKX6_1.0.0/com.ibm.uvelocity.doc/ucv_version_welcome.html",
                "https://"+host+":"+Configurations.getInstance().getUCV_PORT()));
        statusPages.add(new StatusPage("SonarQube",status.isToolAlive( "http://"+host+":"+Configurations.getInstance().getSONAR_PORT()),
                "https://docs.sonarqube.org/latest/",
                "http://"+host+":"+Configurations.getInstance().getSONAR_PORT()));
        statusPages.add(new StatusPage("AppScan",status.isToolAlive("https://stage.appscan.ibmcloud.com/AsoCUI/serviceui/home"),
                "https://www.ibm.com/support/knowledgecenter/en/SSPH29_9.0.3/com.ibm.help.common.infocenter.aps/helpindex_appscan.html",
                "https://stage.appscan.ibmcloud.com/AsoCUI/serviceui/home"));
        return statusPages;
    }
    @GetMapping("/api/AutomatedstatusPremium")
    public List<StatusPage> AutomatedstatusPremium() {
        List<StatusPage> statusPages = new ArrayList<>();
        CheckToolsStatus status = new CheckToolsStatus();
        String host = Configurations.getInstance().getIP();       
        
        statusPages.add(new StatusPage("Jenkins",true,"https://jenkins.io/doc/",
                "http://"+host+":9292"));
        System.out.println("Jenkins Link :"+status.isToolAlive("http://"+host+":9292")+"  -->"+host);
        
        statusPages.add(new StatusPage("UrbanCode Deploy",true,
                "https://www.ibm.com/support/knowledgecenter/en/SS4GSP_6.2.0/com.ibm.udeploy.doc/ucd_version_welcome.html",
                "https://"+host+":"+Configurations.getInstance().getUCD_PORT()));
        statusPages.add(new StatusPage("UrbanCode_Velocity",status.isToolAlive( "https://"+host+":"+Configurations.getInstance().getUCV_PORT()),
                "https://www.ibm.com/support/knowledgecenter/en/SSCKX6_1.0.0/com.ibm.uvelocity.doc/ucv_version_welcome.html",
                "https://"+host+":"+Configurations.getInstance().getUCV_PORT()));
        //statusPages.add(new StatusPage("SonarQube",status.isToolAlive( "http://"+host+":"+Configurations.getInstance().getSONAR_PORT()),
          //      "https://docs.sonarqube.org/latest/",
            //    "http://"+host+":"+Configurations.getInstance().getSONAR_PORT()));
        statusPages.add(new StatusPage("AppScan",status.isToolAlive("https://stage.appscan.ibmcloud.com/AsoCUI/serviceui/home"),
                "https://www.ibm.com/support/knowledgecenter/en/SSPH29_9.0.3/com.ibm.help.common.infocenter.aps/helpindex_appscan.html",
                "https://stage.appscan.ibmcloud.com/AsoCUI/serviceui/home"));
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
    @GetMapping("/api/statusStandardToolChain")
    public List<StatusPage> getSetupForToolChainStandard() {
        List<StatusPage> statusPages = new ArrayList<>();
        CheckToolsStatus status = new CheckToolsStatus();
        String host = Configurations.getInstance().getIP();       
        
        statusPages.add(new StatusPage("Jenkins",true,"https://jenkins.io/doc/",
                "http://"+host+":9292"));
        System.out.println("Jenkins Link :"+status.isToolAlive("http://"+host+":9292")+"  -->"+host);
        
        statusPages.add(new StatusPage("UrbanCode Deploy",true,
                "https://www.ibm.com/support/knowledgecenter/en/SS4GSP_6.2.0/com.ibm.udeploy.doc/ucd_version_welcome.html",
                "https://"+host+":"+Configurations.getInstance().getUCD_PORT()));
        statusPages.add(new StatusPage("UrbanCode_Velocity",status.isToolAlive( "https://"+host+":"+Configurations.getInstance().getUCV_PORT()),
                "https://www.ibm.com/support/knowledgecenter/en/SSCKX6_1.0.0/com.ibm.uvelocity.doc/ucv_version_welcome.html",
                "https://"+host+":"+Configurations.getInstance().getUCV_PORT()));
        statusPages.add(new StatusPage("SonarQube",true,
                "https://docs.sonarqube.org/latest/",
                "http://"+host+":"+Configurations.getInstance().getSONAR_PORT()));
        statusPages.add(new StatusPage("AppScan",status.isToolAlive("https://stage.appscan.ibmcloud.com/AsoCUI/serviceui/home"),
                "https://www.ibm.com/support/knowledgecenter/en/SSPH29_9.0.3/com.ibm.help.common.infocenter.aps/helpindex_appscan.html",
                "https://stage.appscan.ibmcloud.com/AsoCUI/serviceui/home"));
        return statusPages;
 
    }
    
    @GetMapping("/api/reRun")
    public List<StatusPage> reRun() {
        List<StatusPage> li = getStatus();
        return li;
        
    }
    
    
}