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
            console.log(event.target.files);

            this.snackModalEl.style.display = 'block';
        });
    }

}