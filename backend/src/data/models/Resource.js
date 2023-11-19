module.exports = class {
    constructor(data){
        this.id = data.scr_id;
        this.sec_number = data.scr_sec_number;    
        this.crs_id = data.scr_crs_id;
        this.fil_id = data.scr_fil_id;
        this.cdr_id = data.scr_cdr_id;
        this.api_id = data.scr_api_id;
        this.web_id = data.scr_web_id;
    }
};