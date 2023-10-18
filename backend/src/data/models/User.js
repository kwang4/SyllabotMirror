module.exports = class {
    constructor(data){
        this.id = data.userID;
        this.is_admin = data.is_admin;
        this.name =  data.name;
    }
};