

export default class APIService{
    
    static get(url, paramMap, cb) {//TODO to be used for all the get/ftech calls
        let paramArray = [];
        let getURL = url;
        if(paramMap){
            Object.keys(paramMap).map(key => {
                paramArray.push(key + '=' + paramMap[key])
            })
            if(paramArray.length !== 0) {
                getURL += paramArray.join(',')
            }
        }
       
        fetch(getURL)
                .then(response => response.text())
                .then(message => {
                    console.log('GET URL ' + getURL,JSON.parse(message));
                    cb(JSON.parse(message));
                }).catch(error => console.error('Error:', error));
    }

    //TODO code for put
}

