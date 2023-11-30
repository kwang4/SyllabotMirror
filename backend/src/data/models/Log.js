module.exports = class {
    constructor(data){
        this.question = data.qst_question;
        this.response = data.qst_response;
        this.id = data.qst_id;
        this.usr_id = data.con_usr_id;
        this.con_id = data.con_id;
        this.crs_id = data.con_sec_crs_id;
        this.sec_number = data.con_sec_number;
    }
};