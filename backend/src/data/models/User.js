module.exports = class {
    constructor(data){
        this.id = data.usr_id;
        this.is_admin = data.usr_is_admin;
        this.name =  data.usr_first_name + data.usr_last_name;
        this.first_name =  data.usr_first_name;
        this.last_name =  data.usr_last_name;
    }
};