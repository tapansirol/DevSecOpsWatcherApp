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

import com.hcl.dsecops.model.PipeLine;
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
			System.out.println("ERROR: While Creating or Opening the File pipeline.xml");
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
			System.out.println("ERROR: File pipeline.xml not found");
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
	
}
