module.exports = class {
    constructor(data){
        this.usr_id = data.con_usr_id;
        this.con_id = data.con_id;
        this.qst_id = data.con_qst_id;
        this.crs_id = data.con_sec_crs_id;
        this.sec_id = data.con_sec_id;
    }
};