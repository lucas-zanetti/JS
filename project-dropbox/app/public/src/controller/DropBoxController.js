class DropBoxController{

    constructor(){
        this.btnSendFileEl = document.getElementById('btn-send-file');
        this.inputFilesEl = document.getElementById('files');
        this.snackModalEl = document.getElementById('react-snackbar-root');
        this.initEvents();
    }

    initEvents(){
        this.btnSendFileEl.addEventListener('click', ()=>{
            this.inputFilesEl.click();
        });

        this.inputFilesEl.addEventListener('change', event=>{
            this.uploadTask(event.target.files);

            this.snackModalEl.style.display = 'block';
        });
    }

    uploadTask(files){
        let promises = [];

        [...files].forEach(file=>{
            promises.push(new Promise((resolve, reject)=>{
                let ajax = new XMLHttpRequest();

                ajax.open('POST', '/upload');

                ajax.onload = event =>{
                    try {
                        resolve(JSON.parse(ajax.responseText));
                    } catch(e){
                        reject(e);
                    }
                };

                ajax.onerror = event =>{
                    reject(event);
                };

                let formData = new FormData();

                formData.append('input-file', file);

                ajax.send(formData);
            }));
        })

        return Promise.all(promises);
    }

}