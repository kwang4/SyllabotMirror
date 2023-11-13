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
  sections: [
    {
      crs_id: 1,
      number: 1,
      name: "001"
    },
    {
      crs_id: 2,
      number: 1,
      name: "001"
    },
    {
      crs_id: 3,
      number: 2,
      name: "002"
    },
    {
      crs_id: 4,
      number: 3,
      name: "003"
    },
    {
      crs_id: 5,
      number: 100,
      name: "100"
    }
  ],
  semesters: [
    {
      id: 1,
      season: "Maymester",
      year: 2023
    },
    {
      id: 2,
      season: "Summer 1",
      year: 2024
    },
    {
      id: 3,
      season: "Summer 2",
      year: 2025
    },
    {
      id: 4,
      season: "Fall",
      year: 2026
    },
    {
      id: 5,
      season: "Spring",
      year: 2027
    },
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
  testUser2: [
    {
      id: 7,
      is_admin: 0,
      formal_name: "User,Test2",
      preferred_name: "P_User,Test2",
      unity_id: "test2id"
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

