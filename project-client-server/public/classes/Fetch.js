class Fetch {
    static get(url, params = {}){
        return Fetch.request('GET', url, params);
    }

    static delete(url, params = {}){
        return Fetch.request('DELETE', url, params);
    }

    static post(url, params = {}){
        return Fetch.request('POST', url, params);
    }

    static put(url, params = {}){
        return Fetch.request('PUT', url, params);
    }

    static request(method, url, params = {}){
        return new Promise((resolve, reject)=>{
            let request;

            if (method.toLowerCase() != 'get'){
                request = new Request(url, {
                    method,
                    body: JSON.stringify(params),
                    header: new Headers({
                        'Content-Type': 'application/json'
                    })
                });
            } else {
                request = url;
            }            
            
            fetch(request).then(response =>{
                response.json().then(json =>{
                    resolve(json);
                }).catch(e =>{
                    reject(e);
                });
            }).catch(e =>{
                reject(e);
            });
        });
    }
}