package com.hcl.dsecops;

import java.beans.XMLDecoder;
import java.beans.XMLEncoder;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;

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
	
	public static final String GIT_DOC = "https://guides.github.com/";
	public static final String JENKINS_DOC = "https://jenkins.io/doc/";
	public static final String ASOC_DOC = "https://www.ibm.com/support/knowledgecenter/en/SSPH29_9.0.3/com.ibm.help.common.infocenter.aps/helpindex_appscan.html";
	public static final String SONAR_DOC = "https://docs.sonarqube.org/latest/";
	public static final String UCD_DOC = "https://www.ibm.com/support/knowledgecenter/en/SSCKX6_1.0.0/com.ibm.uvelocity.doc/ucv_version_welcome.html";
	public static final String UCV_DOC = "https://www.ibm.com/support/knowledgecenter/en/SS4GSP_6.2.0/com.ibm.udeploy.doc/ucd_version_welcome.html";
	public static final String CLM_DOC = "https://jazz.net/help-dev/clm/index.jsp?topic=%2Fcom.ibm.rational.test.qm.doc%2Ftopics%2Fc_qm_overview.html";
	public static final String TEST_DOC = "https://www.ibm.com/developerworks/downloads/r/rft/index.html";
	public static final String ONE_TEST_DOC = "https://www.hcltech.com/products-and-platforms/onetest";
	public static final String HFT_DOC = "https://www.ibm.com/support/knowledgecenter/SSJMXE_9.2.0/com.ibm.rational.test.ft.doc/rft_welcome.html";
	
	private static final String FILE_NAME="pipelines.xml";
	
	public static String HTTP = "HTTP://";
	public static String HTTPS = "HTTPS://";
	public static String COLON = ":";
	
	private static Configurations CONFIG = Configurations.getInstance();
	public static String HOST = getHost();
	public static String SECUREHOST = getSecureHost();
	
	/**
	 * Adding the created pipeline into local storage (pipelines.xml)
	 * @param pipeline to be added into local storage
	 */
	public void createPipeline(PipeLine pipeline) {
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
	
	
	
	/**
	 * Method to get the pipelines created in local storage (pipelines.xml)
	 * @return all the pipelines which were created using this Application
	 */
	@SuppressWarnings("unchecked")
	public List<PipeLine> getPipelines() {
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
	
	public List<Service> getStandardServices() {
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
		hft.setCode(IService.HOT_CODE); hft.setDisplayName(IService.HOT_DESC); hft.setServiceType(ServiceType.STANDARD); hft.setServiceCategory(ServiceCategory.DEVELOPANDTEST);
		
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
	
	public List<Service> getPremiumServices() {
		
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
		hft.setCode(IService.HOT_CODE); hft.setDisplayName(IService.HOT_DESC); hft.setServiceType(ServiceType.PREMIUM); hft.setServiceCategory(ServiceCategory.DEVELOPANDTEST);
		
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
	
	public StatusPage getToolStatus(String toolCode) {
		CheckToolsStatus status = new CheckToolsStatus();
        StatusPage statusPage= null;
        switch(toolCode) {
        case IService.GITHUB_CODE: statusPage = new StatusPage(IService.GITHUB_CODE,IService.GITHUB_DESC,
        		status.isToolAlive(CONFIG.getGIT_REPO_URL()),
        		GIT_DOC,
        		CONFIG.getGIT_REPO_URL());
        	break;
        case IService.JENKINS_CODE: statusPage = new StatusPage(IService.JENKINS_CODE,IService.JENKINS_DESC,
        		true, //status.isToolAlive(host+CONFIG.getJENKINS_PORT()),
        		JENKINS_DOC,
        		 HOST+CONFIG.getJENKINS_PORT());
        	break;
        case IService.ASOC_CODE: statusPage = new StatusPage(IService.ASOC_CODE,IService.ASOC_DESC,
        		status.isToolAlive(CONFIG.getASOC_URL()),
                ASOC_DOC,
                CONFIG.getASOC_URL());
        	break;
        case IService.SONARQUBE_CODE: statusPage = new StatusPage(IService.SONARQUBE_CODE,IService.SONARQUBE_CODE,
        		status.isToolAlive(HOST+CONFIG.getSONAR_PORT()),
        		SONAR_DOC,
                HOST+CONFIG.getSONAR_PORT());
        	break;
        case IService.UCV_CODE: statusPage = new StatusPage(IService.UCV_CODE,IService.UCV_DESC,
        		status.isToolAlive(SECUREHOST+CONFIG.getUCV_PORT()),
        		UCD_DOC,
        		SECUREHOST+CONFIG.getUCV_PORT());
        	break;
        case IService.UCD_CODE: statusPage = new StatusPage(IService.UCD_CODE,IService.UCD_DESC,
        		status.isToolAlive( SECUREHOST+CONFIG.getUCD_PORT()),
        		UCV_DOC,
        		SECUREHOST+CONFIG.getUCD_PORT());
        	break;
        case IService.RQM_CODE: statusPage = new StatusPage(IService.RQM_CODE,IService.RQM_DESC,
        		status.isToolAlive(SECUREHOST+"9443/qm"),
        		CLM_DOC,
        		SECUREHOST+"9443/qm");
        	break;
        case IService.RTC_CODE: statusPage = new StatusPage(IService.RTC_CODE,IService.RTC_DESC,
        		status.isToolAlive(SECUREHOST+"9443/ccm"),
        		CLM_DOC,
        		SECUREHOST+"9443/ccm");
        	break;
        case IService.DOORS_NG_CODE: statusPage = new StatusPage(IService.DOORS_NG_CODE,IService.DOORS_NG_DESC,
        		status.isToolAlive(SECUREHOST+"9443/rm"),
        		CLM_DOC,
        		SECUREHOST+"9443/rm");
        	break;	
        case IService.HOT_CODE: statusPage = new StatusPage(IService.HOT_CODE,IService.HOT_DESC,
        		true,
        		ONE_TEST_DOC,
        		" ");
        	break;	
        
        default: 
        }
		return statusPage;
	       
	}
	
	public List<StatusPage> getAutoInstallStatusStandard() {
		List<StatusPage> statusPages = new ArrayList<>();
		CheckToolsStatus status = new CheckToolsStatus();
		
        statusPages.add(new StatusPage(IService.JENKINS_CODE, IService.JENKINS_DESC,	
        		true, //status.isToolAlive( host+CONFIG.getJENKINS_PORT()),
        		JENKINS_DOC,
        		HOST+CONFIG.getJENKINS_PORT()));
        statusPages.add(new StatusPage(IService.ASOC_CODE,	IService.ASOC_DESC,
        		status.isToolAlive(CONFIG.getASOC_URL()),
                ASOC_DOC,
                CONFIG.getASOC_URL()));
       statusPages.add(new StatusPage(IService.SONARQUBE_CODE, IService.SONARQUBE_DESC,
    		   status.isToolAlive(HOST+CONFIG.getSONAR_PORT()),
               SONAR_DOC,
               HOST+CONFIG.getSONAR_PORT()));
       statusPages.add(new StatusPage(IService.UCV_CODE, IService.UCV_DESC,
    		   status.isToolAlive(SECUREHOST +CONFIG.getUCV_PORT()),
               UCV_DOC,
                SECUREHOST+CONFIG.getUCV_PORT()));
       statusPages.add(new StatusPage(IService.UCD_CODE, IService.UCD_DESC,
    		   status.isToolAlive( SECUREHOST+CONFIG.getUCD_PORT()),
               UCD_DOC,
                SECUREHOST+CONFIG.getUCD_PORT()));
       statusPages.add(new StatusPage(IService.HOT_CODE, IService.HOT_DESC,
    		   true,
    		   ONE_TEST_DOC,
               ""));
       return statusPages;
	}
	
	public List<StatusPage> getAutoInstallStatusPremium() {
		List<StatusPage> statusPages = new ArrayList<>();
		CheckToolsStatus status = new CheckToolsStatus();
        statusPages.add(new StatusPage(IService.JENKINS_CODE, IService.JENKINS_DESC,
        		true, //status.isToolAlive( host+CONFIG.getJENKINS_PORT()),
        		JENKINS_DOC,
        		HOST+CONFIG.getJENKINS_PORT()));
        statusPages.add(new StatusPage(IService.ASOC_CODE, IService.ASOC_DESC,
        		status.isToolAlive(CONFIG.getASOC_URL()),
               ASOC_DOC,
                CONFIG.getASOC_URL()));
       statusPages.add(new StatusPage(IService.UCV_CODE, IService.UCV_DESC,
    		   status.isToolAlive( SECUREHOST+CONFIG.getUCV_PORT()),
                UCV_DOC,
                SECUREHOST+CONFIG.getUCV_PORT()));
       statusPages.add(new StatusPage(IService.UCD_CODE, IService.UCD_DESC,
    		   status.isToolAlive(SECUREHOST+CONFIG.getUCD_PORT()),
               UCD_DOC,
                SECUREHOST+CONFIG.getUCD_PORT()));
       return statusPages;
	}
	
	public List<StatusPage> getManualInstallStatusStandard() {
		List<StatusPage> statusPages = new ArrayList<>();
//		CheckToolsStatus status = new CheckToolsStatus();
//        String host = CONFIG.getIP();
//        statusPages.add(new StatusPage(IService.HOT_CODE,IService.HOT_DESC,true,ONE_TEST_DOC," "));
       return statusPages;
	}

	public List<StatusPage> getManualInstallStatusPremium() {
		List<StatusPage> statusPages = new ArrayList<>();
		CheckToolsStatus status = new CheckToolsStatus();
        statusPages.add(new StatusPage(IService.DOORS_NG_CODE,IService.DOORS_NG_DESC,
        		status.isToolAlive(SECUREHOST+"9443/rm"),
        		CLM_DOC,
        		SECUREHOST+"9443/rm"));
        statusPages.add(new StatusPage(IService.RTC_CODE,IService.RTC_DESC,
        		status.isToolAlive(SECUREHOST+"9443/ccm"),
                CLM_DOC,
                SECUREHOST+"9443/ccm"));
       statusPages.add(new StatusPage(IService.RQM_CODE,IService.RQM_DESC,
    		   status.isToolAlive(SECUREHOST+"9443/qm"),
    		   CLM_DOC,
    		    SECUREHOST+"9443/qm"));
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
	
	public void updateServiceStatus(List<PipeLine> pipeLineList) {
		for (PipeLine pipeline:pipeLineList) {
			for(Service service:pipeline.getServices()) {
				StatusPage statusPage = getToolStatus(service.getCode());
				if(statusPage!=null) {
					service.setAvailable(statusPage.getInstallationStatus());
				} 
			}
		}
	}
	
	private static String getSecureHost() {
		String ip = CONFIG.getHOST_IP();
		if (ip!=null)	ip = ip.trim();
		return HTTPS+ip+COLON;
	}
	
	private static String getHost() {
		String ip = CONFIG.getHOST_IP();
		if (ip!=null)	ip = ip.trim();
		return HTTP+ip+COLON;
	}
	
}
