module.exports = class {
    constructor(data){
        this.id = data.usr_id;
        this.is_admin = data.usr_is_admin;
        this.formal_name =  data.usr_formal_name;
        this.preferred_name =  data.usr_preferred_name;
        this.unity_id = data.usr_unity_id;
    }
};