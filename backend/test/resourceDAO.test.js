const vars = require('../test/testVariables');
const ResourceDAO = require('../src/data/ResourceDAO');

//NEEDS WORK
describe('TEST getCourseFiles', () => {
  it('Generic Test', done => {
    var sec_num = 1;
    var crs_id = 1;
    ResourceDAO.getCourseFiles(sec_num, crs_id).then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});

/**
 * Unable to test this one yet, expected file path may be a bit off.
 * FAILING
 */
describe('TEST getResourcePath', () => {
  it('Generic Test', done => {
    var sec_num = 1;
    var crs_id = 1;
    var fil_id = 1;
    ResourceDAO.getResourcePath(sec_num, crs_id, fil_id).then(temp => {
      var file_path = "resources/" + temp.fil_name;
      expect(temp.file_path).toEqual(file_path);
      done();
    });
  }, 1000);
});

//NEEDS WORK
describe('TEST uploadFile', () => {
  it('Generic Test', done => {
    var sec_num = 1;
    var crs_id = 1;
    var og_name = "Name";
    var file_path = "/";
    var file_parsedpath = "/";
    ResourceDAO.uploadFile(sec_num, crs_id, og_name, file_path, file_parsedpath).then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});

//FAILING
describe('TEST getResources', () => {
  it('Generic Test', done => {
    var sec_num = 1;
    var crs_id = 1;
    ResourceDAO.getResources(sec_num, crs_id).then(temp => {
      expect(temp.scr_fil_id).toEqual(1);
      done();
    });
  }, 1000);
});

//FAILING
describe('TEST getFile', () => {
  it('Generic Test', done => {
    var file_link = "Link to File 1 Location";
    var file_name = "file_name_1";
    ResourceDAO.getFile(file_link, file_name).then(temp => {
      expect(temp.fil_name).toEqual(file_name);
      done();
    });
  }, 1000);
});

//FAILING
/// There seems to be something wrong with getUniqueFile() function
describe('TEST getUniqueFile', () => {
  it('Generic Test', done => {
    var file_name = "file_name_1";
    var crs_id = 1;
    var sec_num = 1;
    ResourceDAO.getUniqueFile(file_name, crs_id, sec_num).then(temp => {
      expect(temp.fil_name).toEqual(file_name);
      done();
    });
  }, 1000);
});