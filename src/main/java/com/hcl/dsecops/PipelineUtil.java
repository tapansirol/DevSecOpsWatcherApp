package com.hcl.dsecops;

import java.beans.XMLDecoder;
import java.beans.XMLEncoder;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import com.hcl.dsecops.model.IService;
import com.hcl.dsecops.model.PipeLine;
import com.hcl.dsecops.model.Service;
import com.hcl.dsecops.model.ServiceCategory;
import com.hcl.dsecops.model.ServiceType;
import com.hcl.dsecops.model.StatusPage;
import com.hcl.dsecops.service.CheckToolsStatus;
import com.hcl.dsecops.service.Configurations;
/**
 * Utility class for application
 * @author varanganti.j
 *
 */
public class PipelineUtil {
	
	private static final String GIT_DOC = "https://guides.github.com/";
	private static final String JENKINS_DOC = "https://jenkins.io/doc/";
	private static final String ASOC_DOC = "https://www.ibm.com/support/knowledgecenter/en/SSPH29_9.0.3/com.ibm.help.common.infocenter.aps/helpindex_appscan.html";
	private static final String SONAR_DOC = "https://docs.sonarqube.org/latest/";
	private static final String UCD_DOC = "https://www.ibm.com/support/knowledgecenter/en/SSCKX6_1.0.0/com.ibm.uvelocity.doc/ucv_version_welcome.html";
	private static final String UCV_DOC = "https://www.ibm.com/support/knowledgecenter/en/SS4GSP_6.2.0/com.ibm.udeploy.doc/ucd_version_welcome.html";
	private static final String CLM_DOC = "https://jazz.net/help-dev/clm/index.jsp?topic=%2Fcom.ibm.rational.test.qm.doc%2Ftopics%2Fc_qm_overview.html";
	private static final String TEST_DOC = "https://www.ibm.com/developerworks/downloads/r/rft/index.html";
	
	private static final String FILE_NAME="pipelines.xml";
//	private static String CONFIG_FILE_PATH = " ../../config/config.properties";
	private static String CONFIG_FILE_PATH = "/home/config/config.properties";
	
	private static String HTTP = "HTTP://";
	private static String HTTPS = "HTTPS://";
	/**
	 * Adding the created pipeline into local storage (pipelines.xml)
	 * @param pipeline to be added into local storage
	 */
	public static void createPipeline(PipeLine pipeline) {
		loadProperties();
		XMLEncoder encoder=null;
		//This line will be enabled when provided support for multiple-pipeline 
//		List<PipeLine> pipelines = getPipelines();
		List<PipeLine> pipelines = new ArrayList<>();
		pipelines.add(pipeline);
		try{
		encoder=new XMLEncoder(new BufferedOutputStream(new FileOutputStream(FILE_NAME)));
		}catch(FileNotFoundException fileNotFound){
			System.out.println("No pipeline XML file found or error occured while creating or opening the File pipeline.xml");
		}
		encoder.writeObject(pipelines);
		encoder.close();
	}
	
	private static void loadProperties() {
		Properties props = new Properties();
		try{
			InputStream stream = new FileInputStream(CONFIG_FILE_PATH);
			props.load(stream);
			System.out.println("HOST_MACHINE_USER_NAME ====> "+props.getProperty("HOST_MACHINE_USER_NAME"));
			Configurations.getInstance().setProperties(props);
			
		}
		catch (IOException ioe) {
			ioe.printStackTrace();
		}
		catch(Exception e) {
			System.out.print("Unable to read the configurations file from "+CONFIG_FILE_PATH);
			System.out.println(e.getMessage());
		}
	} 
	
	/**
	 * Method to get the pipelines created in local storage (pipelines.xml)
	 * @return all the pipelines which were created using this Application
	 */
	@SuppressWarnings("unchecked")
	public static List<PipeLine> getPipelines() {
		XMLDecoder decoder=null;
		try {
			decoder=new XMLDecoder(new BufferedInputStream(new FileInputStream(FILE_NAME)));
		} catch (FileNotFoundException e) {
			System.out.println("No pipeline XML file found or error occured while creating or opening the File pipeline.xml");
			return new ArrayList<>();
		}
		List<PipeLine> pipelines = new ArrayList<>();
		Object object = decoder.readObject();
		if (object!=null && object instanceof ArrayList) {
			pipelines=(List<PipeLine>)object;
		}
		System.out.println(pipelines);
		decoder.close();
		return pipelines;
	}
	
	public static List<Service> getStandardServices() {
		List<Service> list = new ArrayList<>();
		Service git =new Service();
		git.setCode(IService.GITHUB_CODE); git.setDisplayName(IService.GITHUB_DESC); git.setServiceType(ServiceType.STANDARD); git.setServiceCategory(ServiceCategory.DEVELOPANDTEST);
		
		Service jenkins =new Service();
		jenkins.setCode(IService.JENKINS_CODE); jenkins.setDisplayName(IService.JENKINS_DESC); jenkins.setServiceType(ServiceType.STANDARD); jenkins.setServiceCategory(ServiceCategory.DEVELOPANDTEST);
		
		Service sonar =new Service();
		sonar.setCode(IService.SONARQUBE_CODE); sonar.setDisplayName(IService.SONARQUBE_DESC); sonar.setServiceType(ServiceType.STANDARD); sonar.setServiceCategory(ServiceCategory.DEVELOPANDTEST);
		
		Service asoc =new Service();
		asoc.setCode(IService.ASOC_CODE); asoc.setDisplayName(IService.ASOC_DESC); asoc.setServiceType(ServiceType.STANDARD); asoc.setServiceCategory(ServiceCategory.DEVELOPANDTEST);
		
		Service hft =new Service();
		hft.setCode(IService.HFT_CODE); hft.setDisplayName(IService.HFT_DESC); hft.setServiceType(ServiceType.STANDARD); hft.setServiceCategory(ServiceCategory.DEVELOPANDTEST);
		
		Service ucd =new Service();
		ucd.setCode(IService.UCD_CODE); ucd.setDisplayName(IService.UCD_DESC); ucd.setServiceType(ServiceType.STANDARD); ucd.setServiceCategory(ServiceCategory.RELEASEANDDEPLOY);
		
		Service ucv =new Service();
		ucv.setCode(IService.UCV_CODE); ucv.setDisplayName(IService.UCV_DESC); ucv.setServiceType(ServiceType.STANDARD); ucv.setServiceCategory(ServiceCategory.RELEASEANDDEPLOY);
		
		list.add(git);
		list.add(jenkins);
		list.add(sonar);
		list.add(asoc);
		list.add(hft);
		list.add(ucd);
		list.add(ucv);
		
		return list;
	}
	
	public static List<Service> getPremiumServices() {
		
		List<Service> list = new ArrayList<>();
		Service git =new Service();
		git.setCode(IService.GITHUB_CODE); git.setDisplayName(IService.GITHUB_DESC); git.setServiceType(ServiceType.PREMIUM); git.setServiceCategory(ServiceCategory.DEVELOPANDTEST);
		
		Service jenkins =new Service();
		jenkins.setCode(IService.JENKINS_CODE); jenkins.setDisplayName(IService.JENKINS_DESC); jenkins.setServiceType(ServiceType.PREMIUM); jenkins.setServiceCategory(ServiceCategory.DEVELOPANDTEST);
		
		Service asoc =new Service();
		asoc.setCode(IService.ASOC_CODE); asoc.setDisplayName(IService.ASOC_DESC); asoc.setServiceType(ServiceType.PREMIUM); asoc.setServiceCategory(ServiceCategory.DEVELOPANDTEST);
		
		Service rtc =new Service();
		rtc.setCode(IService.RTC_CODE); rtc.setDisplayName(IService.RTC_DESC); rtc.setServiceType(ServiceType.PREMIUM); rtc.setServiceCategory(ServiceCategory.PLANANDMEASURE);
		
		Service rqm =new Service();
		rqm.setCode(IService.RQM_CODE); rqm.setDisplayName(IService.RQM_DESC); rqm.setServiceType(ServiceType.PREMIUM); rqm.setServiceCategory(ServiceCategory.DEVELOPANDTEST);
		
		Service doors =new Service();
		doors.setCode(IService.DOORS_NG_CODE); doors.setDisplayName(IService.DOORS_NG_DESC); doors.setServiceType(ServiceType.PREMIUM); doors.setServiceCategory(ServiceCategory.PLANANDMEASURE);
		
		Service hft =new Service();
		hft.setCode(IService.HFT_CODE); hft.setDisplayName(IService.HFT_DESC); hft.setServiceType(ServiceType.PREMIUM); hft.setServiceCategory(ServiceCategory.DEVELOPANDTEST);
		
		Service ucd =new Service();
		ucd.setCode(IService.UCD_CODE); ucd.setDisplayName(IService.UCD_DESC); ucd.setServiceType(ServiceType.PREMIUM); ucd.setServiceCategory(ServiceCategory.RELEASEANDDEPLOY);
		
		Service ucv =new Service();
		ucv.setCode(IService.UCV_CODE); ucv.setDisplayName(IService.UCV_DESC); ucv.setServiceType(ServiceType.PREMIUM); ucv.setServiceCategory(ServiceCategory.RELEASEANDDEPLOY);
		
		list.add(git);
		list.add(jenkins);
		list.add(asoc);
		list.add(rtc);
		list.add(doors);
		list.add(rqm);
		list.add(hft);
		list.add(ucd);
		list.add(ucv);
		
		return list;
	}
	
	public static StatusPage getToolStatus(String toolCode) {
		CheckToolsStatus status = new CheckToolsStatus();
        String host = HTTP+Configurations.getInstance().getHOST_IP()+":";
        String secureHost = HTTPS+Configurations.getInstance().getHOST_IP()+":";
        StatusPage statusPage= null;
        switch(toolCode) {
        case IService.GITHUB_CODE: statusPage = new StatusPage(IService.GITHUB_CODE,IService.GITHUB_DESC,
        		status.isToolAlive(Configurations.getInstance().getGIT_REPO_URL()),
        		GIT_DOC,
        		Configurations.getInstance().getGIT_REPO_URL());
        	break;
        case IService.JENKINS_CODE: statusPage = new StatusPage(IService.JENKINS_CODE,IService.JENKINS_DESC,
        		status.isToolAlive(host+Configurations.getInstance().getJENKINS_PORT()),
        		JENKINS_DOC,
        		 host+Configurations.getInstance().getJENKINS_PORT());
        	break;
        case IService.ASOC_CODE: statusPage = new StatusPage(IService.ASOC_CODE,IService.ASOC_DESC,
        		status.isToolAlive(Configurations.getInstance().getASOC_URL()),
                ASOC_DOC,
                Configurations.getInstance().getASOC_URL());
        	break;
        case IService.SONARQUBE_CODE: statusPage = new StatusPage(IService.SONARQUBE_CODE,IService.SONARQUBE_CODE,
        		status.isToolAlive(host+Configurations.getInstance().getSONAR_PORT()),
        		SONAR_DOC,
                host+Configurations.getInstance().getSONAR_PORT());
        	break;
        case IService.UCV_CODE: statusPage = new StatusPage(IService.UCV_CODE,IService.UCV_DESC,
        		status.isToolAlive(secureHost+Configurations.getInstance().getUCV_PORT()),
        		UCD_DOC,
                secureHost+Configurations.getInstance().getUCV_PORT());
        	break;
        case IService.UCD_CODE: statusPage = new StatusPage(IService.UCD_CODE,IService.UCD_DESC,
        		status.isToolAlive( secureHost+Configurations.getInstance().getUCD_PORT()),
        		UCV_DOC,
        		secureHost+Configurations.getInstance().getUCD_PORT());
        	break;
        case IService.RQM_CODE: statusPage = new StatusPage(IService.RQM_CODE,IService.RQM_DESC,
        		status.isToolAlive(secureHost+"9443/qm"),
        		CLM_DOC,
        		secureHost+"9443/qm");
        	break;
        case IService.RTC_CODE: statusPage = new StatusPage(IService.RTC_CODE,IService.RTC_DESC,
        		status.isToolAlive(secureHost+"9443/ccm"),
        		CLM_DOC,
        		secureHost+"9443/ccm");
        	break;
        case IService.DOORS_NG_CODE: statusPage = new StatusPage(IService.DOORS_NG_CODE,IService.DOORS_NG_DESC,
        		status.isToolAlive(secureHost+"9443/rm"),
        		CLM_DOC,
        		secureHost+"9443/rm");
        	break;	
        
        default: 
        }
		return statusPage;
	       
	}
	
	public static List<StatusPage> getAutoInstallStatusStandard() {
		List<StatusPage> statusPages = new ArrayList<>();
		CheckToolsStatus status = new CheckToolsStatus();
		String host = HTTP+Configurations.getInstance().getHOST_IP()+":";
		String secureHost = HTTPS+Configurations.getInstance().getHOST_IP()+":";
        statusPages.add(new StatusPage(IService.JENKINS_CODE, IService.JENKINS_DESC,	
        		status.isToolAlive( host+Configurations.getInstance().getJENKINS_PORT()),
        		JENKINS_DOC,
        		host+Configurations.getInstance().getJENKINS_PORT()));
        statusPages.add(new StatusPage(IService.ASOC_CODE,	IService.ASOC_DESC,
        		status.isToolAlive(Configurations.getInstance().getASOC_URL()),
                ASOC_DOC,
                Configurations.getInstance().getASOC_URL()));
       statusPages.add(new StatusPage(IService.SONARQUBE_CODE, IService.SONARQUBE_DESC,
    		   status.isToolAlive(host+Configurations.getInstance().getSONAR_PORT()),
               SONAR_DOC,
               host+Configurations.getInstance().getSONAR_PORT()));
       statusPages.add(new StatusPage(IService.UCV_CODE, IService.UCV_DESC,
    		   status.isToolAlive(secureHost +Configurations.getInstance().getUCV_PORT()),
               UCV_DOC,
                secureHost+Configurations.getInstance().getUCV_PORT()));
       statusPages.add(new StatusPage(IService.UCD_CODE, IService.UCD_DESC,
    		   status.isToolAlive( secureHost+Configurations.getInstance().getUCD_PORT()),
               UCD_DOC,
                secureHost+Configurations.getInstance().getUCD_PORT()));
       return statusPages;
	}
	
	public static List<StatusPage> getAutoInstallStatusPremium() {
		List<StatusPage> statusPages = new ArrayList<>();
		CheckToolsStatus status = new CheckToolsStatus();
		String host = HTTP+Configurations.getInstance().getHOST_IP()+":";
		String secureHost = HTTPS+Configurations.getInstance().getHOST_IP()+":";
        statusPages.add(new StatusPage(IService.JENKINS_CODE, IService.JENKINS_DESC,
        		status.isToolAlive( host+Configurations.getInstance().getJENKINS_PORT()),
        		JENKINS_DOC,
        		host+Configurations.getInstance().getJENKINS_PORT()));
        statusPages.add(new StatusPage(IService.ASOC_CODE, IService.ASOC_DESC,
        		status.isToolAlive(Configurations.getInstance().getASOC_URL()),
               ASOC_DOC,
                Configurations.getInstance().getASOC_URL()));
       statusPages.add(new StatusPage(IService.UCV_CODE,"UrbanCode_Velocity",
    		   status.isToolAlive( secureHost+Configurations.getInstance().getUCV_PORT()),
                UCV_DOC,
                secureHost+Configurations.getInstance().getUCV_PORT()));
       statusPages.add(new StatusPage(IService.UCD_CODE,"UrbanCode Deploy",
    		   status.isToolAlive(secureHost+Configurations.getInstance().getUCD_PORT()),
               UCD_DOC,
                secureHost+Configurations.getInstance().getUCD_PORT()));
       return statusPages;
	}
	
	public static List<StatusPage> getManualInstallStatusStandard() {
		List<StatusPage> statusPages = new ArrayList<>();
//		CheckToolsStatus status = new CheckToolsStatus();
//        String host = Configurations.getInstance().getIP();
        statusPages.add(new StatusPage(IService.HFT_CODE,IService.HFT_DESC,true,TEST_DOC,
                " "));
       return statusPages;
	}

	public static List<StatusPage> getManualInstallStatusPremium() {
		List<StatusPage> statusPages = new ArrayList<>();
		CheckToolsStatus status = new CheckToolsStatus();
		String host = HTTP+Configurations.getInstance().getHOST_IP()+":";
		String secureHost = HTTPS+Configurations.getInstance().getHOST_IP()+":";
        statusPages.add(new StatusPage(IService.DOORS_NG_CODE,IService.DOORS_NG_DESC,
        		status.isToolAlive(secureHost+"9443/rm"),
        		CLM_DOC,
        		secureHost+"9443/rm"));
        statusPages.add(new StatusPage(IService.RTC_CODE,IService.RTC_DESC,
        		status.isToolAlive(secureHost+"9443/ccm"),
                CLM_DOC,
                secureHost+"9443/ccm"));
       statusPages.add(new StatusPage(IService.RQM_CODE,IService.RQM_DESC,
    		   status.isToolAlive(secureHost+"9443/qm"),
    		   CLM_DOC,
    		    secureHost+"9443/qm"));
       statusPages.add(new StatusPage(IService.HFT_CODE,IService.HFT_DESC,
    		   true,
    		   TEST_DOC,
                ""));
       statusPages.add(new StatusPage(IService.HPT_CODE,IService.HPT_DESC,
    		   true,
    		   TEST_DOC,
               ""));
       return statusPages;
	}
	
	public static void updateServiceStatus(List<PipeLine> pipeLineList) {
		for (PipeLine pipeline:pipeLineList) {
			for(Service service:pipeline.getServices()) {
				StatusPage statusPage = getToolStatus(service.getCode());
				if(statusPage!=null) {
					service.setAvailable(statusPage.getInstallationStatus());
				} 
			}
		}
	}
	
}
