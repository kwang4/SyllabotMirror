module.exports = {
  courses: [
    { courseID: 1, semesterID: 1, courseName: 'Senior Design' },
    { courseID: 2, semesterID: 2, courseName: 'Data Structures' },
    { courseID: 3, semesterID: 3, courseName: 'Junior Design' },
    { courseID: 4, semesterID: 4, courseName: 'Network Security' },
    { courseID: 5, semesterID: 5, courseName: 'Software Development' }
  ],
  users: [
      {
        id: 1,
        is_admin: 1,
        formal_name: "Partin,Brandon",
        preferred_name: "P_Partin,Brandon",
        unity_id: "blpartin"
    },
    {
        id: 2,
        is_admin: 1,
        formal_name: "Riggs,Collin",
        preferred_name: "P_Riggs,Collin",
        unity_id: "cmriggs"
    },
    {
        id: 3,
        is_admin: 1,
        formal_name: "Wang,Kai-En",
        preferred_name: "P_Wang,Kai-En",
        unity_id: "kwang23"
    },
    {
        id: 4,
        is_admin: 1,
        formal_name: "Hall,Jackson",
        preferred_name: "P_Hall,Jackson",
        unity_id: "jdhall9"
    },
    {
        id: 5,
        is_admin: 1,
        formal_name: "Buchanan,Daniel",
        preferred_name: "P_Buchanan,Daniel",
        unity_id: "dbuchanan"
    }
  ],
  testUser: [
    {
      id: 6,
      is_admin: 0,
      formal_name: "User,Test",
      preferred_name: "P_User,Test",
      unity_id: "testid"
    }
  ],
  deploys: [
    {
      "deployID": 1,
      "primary_token": "Slack Primary Token for Deploy 1",
      "syllabotID": 1,
      "typeID": 1
    },
    {
      "deployID": 2,
      "primary_token": "Discord Primary Token for Deploy 2",
      "syllabotID": 2,
      "typeID": 2
    },
    {
      "deployID": 3,
      "primary_token": "Slack Primary Token for Deploy 3",
      "syllabotID": 3,
      "typeID": 1
    },
    {
      "deployID": 4,
      "primary_token": "Discord Primary Token for Deploy 4",
      "syllabotID": 4,
      "typeID": 2
    },
    {
      "deployID": 5,
      "primary_token": "Slack Primary Token for Deploy 5",
      "syllabotID": 5,
      "typeID": 1
    }
  ]
};

