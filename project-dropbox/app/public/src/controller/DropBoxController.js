class DropBoxController{

    constructor(){
        this.btnSendFileEl = document.getElementById('btn-send-file');
        this.inputFilesEl = document.getElementById('files');
        this.snackModalEl = document.getElementById('react-snackbar-root');
        this.progressBarEl = this.snackModalEl.querySelector('.mc-progress-bar-fg');
        this.fileNameEl = this.snackModalEl.querySelector('.filename');
        this.timeLeftEl = this.snackModalEl.querySelector('.timeleft');

        this.initEvents();
    }

    initEvents(){
        this.btnSendFileEl.addEventListener('click', ()=>{
            this.inputFilesEl.click();
        });

        this.inputFilesEl.addEventListener('change', event=>{
            this.uploadTask(event.target.files);

            this.modalShow();

            this.inputFilesEl.value = '';
        });
    }

    modalShow(show = true){
        this.snackModalEl.style.display = (show) ? 'block' : 'none';
    }

    uploadTask(files){
        let promises = [];

        [...files].forEach(file=>{
            promises.push(new Promise((resolve, reject)=>{
                let ajax = new XMLHttpRequest();

                ajax.open('POST', '/upload');

                ajax.onload = event =>{
                    this.modalShow(false);
                    
                    try {
                        resolve(JSON.parse(ajax.responseText));
                    } catch(e){
                        reject(e);
                    }
                };

                ajax.onerror = event =>{
                    this.modalShow(false);
                    reject(event);
                };

                ajax.upload.onprogress = event =>{
                    this.uploadProgress(event, file);
                };

                let formData = new FormData();

                formData.append('input-file', file);

                this.startUploadTime = Date.now();

                ajax.send(formData);
            }));
        })

        return Promise.all(promises);
    }

    uploadProgress(event, file){
        let timeSpent = Date.now() - this.startUploadTime; 
        let loaded = event.loaded;
        let total = event.total;

        let percentage = parseInt((loaded/total) * 100);

        let timeLeft = ((100 - percentage) * timeSpent)/percentage;

        this.progressBarEl.style.width = `${percentage}%`;

        this.fileNameEl.innerHTML = file.name;

        this.timeLeftEl.innerHTML = this.formatTimeToHuman(timeLeft);
    }

    formatTimeToHuman(duration){
        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / 60000) % 60);
        let hours = parseInt((duration / 3600000) % 24);

        if(hours > 0) return `${hours} horas, ${minutes} minutos e ${seconds} segundos`;
        if(minutes > 0) return `${minutes} minutos e ${seconds} segundos`;
        if(seconds > 0) return `${seconds} segundos`;

        return '0 segundos';
    }

}