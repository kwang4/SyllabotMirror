module.exports = class {
  constructor(data){
      this.syllabotID = data.syl_id;
      this.courseID = data.syl_crs_id;
      this.name = data.syl_name;
      this.prompt_flavor = data.syl_prompt_flavor;
      this.profile_picture = data.syl_profile_picture;
  }
};