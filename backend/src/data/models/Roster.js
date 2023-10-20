module.exports = class {
    constructor(data){
        this.rosterID = data.ros_id;
        this.userID = data.ros_usr_id;
        this.sectionID = data.ros_sec_number;
        this.roleID = data.ros_rol_id;
    }
};