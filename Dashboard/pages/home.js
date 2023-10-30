import Head from 'next/head';
import styles from '@styles/Home.module.css';
const axios = require('axios');
import Link from 'next/link'
import NcsuHeader from '@components/NcsuHeader.js';
import APIModule from '@components/APIModule.js';
import ClassCard from '@components/ClassCard';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';

export default function Home() {                    
  const [classDat,setClassDat] = useState([]);
  const [semesterData,setSemesterData] = useState([]);
  const [instructorData,setInstructorData] = useState([]);
  //Course Creation
  const [dialogStatus,setDialogStatus] = useState(false);
  const [semesterSelector,setSemesterSelector] = useState('');
  const [courseName, setCourseName] = useState('');
  const [sectionNum, setSectionNum] = useState('');
  const [createCourseError, setCreateCourseError] = useState(false);
  //Get courses v2
  const [authenticatedUser, setAuthenticatedUser] = useState({});
  const [courseData, setCourseData] = useState([]);



  /**
   * Hits the /users/:userID/courses endpoint, retrieves all courses an authenticated user is allowed to see, such as
   * the courses they are teachers in, or in the case of admins all courses for the current semester
   * 
   */
  async function fetchCourseInfo()
  {
    //Gets all courses a user is responsible for (admin see all courses not done yet)
    const sectionResp = await APIModule.get(`/users/${authenticatedUser.id}/courses`);
    if(sectionResp?.status != 200)
    {
      console.log("Section API call error");
      return;
    }
    let courseList = sectionResp.data;
    setCourseData(courseList);

  }

  async function fetchAuthenticatedUser()
  {
    const shibResponse = await APIModule.get('/shib');
    if(shibResponse?.data != null)
    {
      const unityid = shibResponse.data.unityid;
      const usrResponse = await APIModule.get(`/users/unityid/${unityid}`);
      if(usrResponse?.data != null)
      {
        setAuthenticatedUser(usrResponse.data);
      }
    }
  }

  async function fetchSemesterData()
  {
    const response = await APIModule.get('/semesters');
    if(response?.data != null)
    {
      setSemesterData(response.data);
    }
  }

  useEffect(()=>{
    fetchSemesterData();
    fetchAuthenticatedUser();
   // fetchSections();
  },[]);

  useEffect(()=>{
    fetchCourseInfo();
    
  },[authenticatedUser]);

  /**
   * Function to validate course fields before hitting the POST request
   */
  function validateCourse()
  {

  }

  async function createCourse()
  {
    const courseData  = {
      'courseName': courseName,
      'sectionNum': sectionNum,
      'semesterId': semesterSelector
    }
    const response = await APIModule.post(`/semesters/${semesterSelector}/courses`,courseData);
    console.log(response);
    if(response?.status != 200)
    {
      setCreateCourseError(true);
      console.log(response);
      return;
    }
    else
    {
      setCreateCourseError(false);
    }
    window.location.reload();
  }

function toggleCourseDialog()
{
  if(dialogStatus)
    setDialogStatus(false);
  else
    setDialogStatus(true);

}
const handleSemesterChange = (event) =>{
  setSemesterSelector(event.target.value);
}
const handleCourseName = (event) =>{
  setCourseName(event.target.value);
}
const handleSectionNum = (event) =>{
  setSectionNum(event.target.value);
}

  return (
    <div className={styles.container}>
      <Head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Syllabot</title>
        <link rel="icon" href="/react.ico" />
      </Head>
      <NcsuHeader>Syllabot</NcsuHeader>
      <h2 className={styles.title}>
          Courses
        </h2>
      <main className={styles.mainStyle}>
        

<Grid sx={{width:'80%',}} container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

{courseData.map((card, index) => (
  <Grid key={index} xs={6} sm={4}>
    <Link href={`/course/${card.courseName + "-" + String(card.sectionNum).padStart(3,'0')}`} style={{textDecoration:'none'}} passHref>
        <ClassCard classTitle={card.courseName} classInstructors={card.instructors.join(',')} />
    </Link>
  </Grid>
))}
  <Grid key={0} xs={6} sm={4}>
    <div onClick={toggleCourseDialog}>
        <ClassCard classTitle='Add Course' classInstructors={' '}/>
        </div>
  </Grid>
</Grid>

<Dialog fullWidth open={dialogStatus} onClose={toggleCourseDialog}>
  <DialogTitle id="add-course-dialog">Add Course</DialogTitle>
  <DialogContent dividers>
  <Grid container direction="column" spacing={2}>
          <Grid>
            <TextField
              autoFocus
              fullWidth
              margin="dense"
              id="courseName"
              label="Course Name"
              variant="standard"
              onChange={handleCourseName}
            />
          </Grid>
          <Grid>
            <TextField
              margin="dense"
              fullWidth
              id="sectionNum"
              label="Section"
              variant="standard"
              type="number"
              onChange={handleSectionNum}
            />
          </Grid>
          <Grid>
            <FormControl fullWidth>
              <InputLabel id="semesterId">Semester</InputLabel>
              <Select labelId="select-semester" id="select-semester" value={semesterSelector} label="Semester" onChange={handleSemesterChange}>
                {semesterData.map((semester,index)=>(
                  <MenuItem key={index} value={semester.semesterID}>{semester.season + " " + semester.year}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid>
           {createCourseError && 
            <Typography variant="subtitle1" sx={{color:'red'}}>
             Invalid Fields
            </Typography>
          }
          </Grid>
        </Grid>
  </DialogContent>
    <DialogActions>
      <Button onClick={toggleCourseDialog} color="secondary">Cancel</Button>
      <Button onClick={createCourse} color="primary">Add</Button>
    </DialogActions>
  
</Dialog>

      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/react.png" alt="Big Chungus" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
      
        main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
