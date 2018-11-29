package com.hcl.dsecops;

import java.beans.XMLDecoder;
import java.beans.XMLEncoder;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.HttpClientBuilder;

import com.hcl.dsecops.model.PipeLine;

public class PipelineUtil {
	
	private static final String FILE_NAME="pipelines.xml";
		
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
	
	@SuppressWarnings("unchecked")
	public static List<PipeLine> getPipelines() {
		XMLDecoder decoder=null;
		try {
			decoder=new XMLDecoder(new BufferedInputStream(new FileInputStream(FILE_NAME)));
		} catch (FileNotFoundException e) {
			System.out.println("ERROR: File pipeline.xml not found");
			return new ArrayList<>();
		}
		List<PipeLine> bourneSeries = new ArrayList<>();
		Object object = decoder.readObject();
		if (object!=null && object instanceof ArrayList) {
			bourneSeries=(List<PipeLine>)object;
		}
		System.out.println(bourneSeries);
		decoder.close();
		return bourneSeries;
	}
	
//	private static String URL_SECURED_BY_BASIC_AUTHENTICATION = "http://35.174.141.72:8082";
//	public static HttpResponse openJenkinsTool() {
//		CredentialsProvider provider = new BasicCredentialsProvider();
//		UsernamePasswordCredentials credentials = new UsernamePasswordCredentials("admin", "admin");
//		provider.setCredentials(AuthScope.ANY, credentials);
//		HttpClient client = HttpClientBuilder.create().setDefaultCredentialsProvider(provider).build();
//
//		HttpResponse response = null;
//		try {
//			response = client.execute(new HttpGet(URL_SECURED_BY_BASIC_AUTHENTICATION));
//		} catch (ClientProtocolException e) {
//			e.printStackTrace();
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		System.out.println("response =====>  "+response);
//		return response;
//	}
//	
//	public static void main(String[] args) {
//		openJenkinsTool();
//	}
}
