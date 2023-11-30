module.exports = class {
    constructor(data){
        this.question = data.qst_question;
        this.response = data.qst_response;
        this.id = data.qst_id;
    }
};