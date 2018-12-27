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
/**
 * Utility class for application
 * @author varanganti.j
 *
 */
public class PipelineUtil {
	
	private static final String FILE_NAME="pipelines.xml";
	/**
	 * Adding the created pipeline into local storage (pipelines.xml)
	 * @param pipeline to be added into local storage
	 */
	public static void createPipeline(PipeLine pipeline) {
		XMLEncoder encoder=null;
		List<PipeLine> pipelines = getPipelines();
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
	
}
