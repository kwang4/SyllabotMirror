module.exports = class {
  constructor(data){
      this.deployID = data.dep_id;
      this.syllabotID = data.dep_syl_id;
      this.typeID = data.dep_typ_id;
      this.primary_token = data.dep_primary_token;
  }
};