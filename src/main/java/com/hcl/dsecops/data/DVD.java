package com.hcl.dsecops.data;

import java.util.ArrayList;
import java.util.List;

public class DVD {	
	private List<Movie> movies=new ArrayList<Movie>();	
	public DVD(){}
	public List<Movie> getMovies() {
		return movies;
	}
	public void setMovies(List<Movie> movies) {
		this.movies = movies;
	}	
	public String toString(){
		String movies="";
		for(Movie movie:getMovies()){
			movies += movie.getName()+", ";
		}
		return movies; 
	}	
 }