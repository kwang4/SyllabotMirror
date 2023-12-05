import Head from 'next/head';
import styles from '@styles/Home.module.css';
import Link from 'next/link';
import NcsuHeader from '@components/NcsuHeader.js';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import List from '@mui/material/List';
import { ListItem } from '@mui/material'
import ListItemText from '@mui/material/ListItemText';;
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useRouter } from 'next/router';
import APIModule from '@components/APIModule';

export default function Roster() {
  const router = useRouter();
  const { semesterID, courseName } = router.query;

  const [uploadStudentDialog,setUploadStudentDialog] = useState(false);
  const [uploadCSVDialog,setUploadCSVDialog] = useState(false);
  const [courseObject, setCourseObject] = useState(null);
  const [roster,setRoster] = useState([]);
  const [formalName, setFormalName] = useState('');
  const [preferredName, setPreferredName] = useState('');
  const [unityID, setUnityID] = useState('');
  const [confirmDeleteDialog,setConfirmDeleteDialog] = useState(false);

  const handleFormalName = (event) =>{
    setFormalName(event.target.value);
  }
  const handlePreferredName = (event) =>{
    setPreferredName(event.target.value);
  }
  const handleUnityID = (event) =>{
    setUnityID(event.target.value);
  }

  /**
   * Toggles state variable for whether the the delete confirmation dialog is open or closed. Resets resource to delete on close, and removes error messages.
   */
  const toggleDeleteDialog = ()=>{
  if(confirmDeleteDialog)
  {
    setConfirmDeleteDialog(false);
    setResToDelete(null);
    setDeleteErr('');
  }
  else
  {
    setConfirmDeleteDialog(true);
  }
}

  const toggleStudentDialog = ()=>
{
  if(uploadStudentDialog)
    setUploadStudentDialog(false);
  else
    setUploadStudentDialog(true);
}
const toggleUploadCSVDialog = ()=>
{
  if(uploadCSVDialog)
    setUploadCSVDialog(false);
  else
    setUploadCSVDialog(true);
}

/**
 * Method to hit an API endpoint for the whole course Object (mostly needed for courseID)
 * If the courseObject state variable is already populated, it just returns that.
 * @returns courseObject with course ID, name, and other fields
 */
async function getCourseObj()
{
  if(courseObject)
    return courseObject;

  if(semesterID != null && courseName != null)
  {
    const splitIdx = courseName.lastIndexOf('-');
    const splitCourseName = encodeURIComponent(courseName.slice(0,splitIdx));
    const courseResponse = await APIModule.get(`/semesters/${semesterID}/courses/courseName/${splitCourseName}`);
    if(courseResponse?.status != 200)
    {
      console.log("Error getting course object by name");
      return;
    }
    setCourseObject(courseResponse.data);
    return courseResponse.data; 
  }
}

async function getRoster()
{
  if(!semesterID || !courseName)
  {
    console.log("Course name or semester not found from query parameters");
    return;
  }
  let courseObj = null;
  const splitIdx = courseName.lastIndexOf('-');
  const splitCourseSection = encodeURIComponent(courseName.slice(splitIdx+1));
  if(!courseObject)
  {
    courseObj = await getCourseObj();
    console.log(courseObj);
  }
  else
  {
    courseObj = courseObject;
    console.log(courseObj);
  }
  const rosterResponse = await APIModule.get(`/semesters/${semesterID}/courses/${courseObj.courseID}/sections/${splitCourseSection}/roster`);
  if(rosterResponse.status != 200){
    console.log("Error getting roster");
    return;
  }
  setRoster(rosterResponse.data);
}

async function handleNewStudent(){
  let response = addStudentObj();
  toggleStudentDialog();
  return response;
}
/**
 * Method to hit an API endpoint for the whole course Object (mostly needed for courseID)
 * If the courseObject state variable is already populated, it just returns that.
 * @returns courseObject with course ID, name, and other fields
 */
async function addStudentObj(){
  const studentData  = {
    "user": {
      'is_admin': 0,
      'formal_name': formalName,
      'preferred_name': preferredName,
      'unity_id': unityID,
      'is_teacher': 0
    },
    'role_id': 4 // this should be the ENUM for Student
  }
  let courseObj = null;
  const splitIdx = courseName.lastIndexOf('-');
  const splitCourseSection = encodeURIComponent(courseName.slice(splitIdx+1));
  if(!courseObject)
  {
    courseObj = await getCourseObj();
  }
  else
  {
    courseObj = courseObject;
  }
  // /semesters/:semesterid/courses/:courseid/sections/:sectionNum/roster
  const rosterResponse = await APIModule.post(`/semesters/${semesterID}/courses/${courseObj.courseID}/sections/${splitCourseSection}/roster`, studentData);
  window.location.reload();
  return rosterResponse;
}
useEffect(()=>{
  getRoster();
},[semesterID]);

  return (
    <div className={styles.container}>
      <Head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Syllabot</title>
        <link rel="icon" href="/react.ico" />
      </Head>
      <NcsuHeader>Syllabot</NcsuHeader>
      <h2 className={styles.title}>
          Manage Roster 
        </h2>
        <h2>
          <Link href={`/semester/${semesterID}/course/${courseName}`}>Go Back</Link>
        </h2>
      <main className={styles.mainStyle}>
    
    <List
      sx={{
        width: '100%',
        maxWidth: '60vw',
        bgcolor: 'lightgray',
        position: 'relative',
        overflow: 'auto',
        maxHeight: '50vh',
        borderRadius:'2%',
        '& ul': { padding: 0 },
      }}
    >
        <ListItem key={0}>
        <Grid container spacing={0} sx={{width:'100%'}}>
           <Grid xs={7}>
              <ListItemText sx={{variant:"h1"}} primary={'Student Name'}/>
           </Grid>
          <Grid xs={4}>
            <ListItemText primary = {'Unity ID'}/>
          </Grid>
        </Grid>
        </ListItem>
        <Divider sx={{borderBottomWidth: 3,borderColor:'black'}}/>
      {roster.map((student,index)=>(
            <ListItem key={index}>
               <Grid container spacing={0} sx={{width:'100%'}}>
                <Grid xs={7}>
                  <ListItemText primary={student.formal_name.split(',').reverse().join(' ')}/>
                </Grid>
                <Grid xs={4}>
                  <ListItemText primary = {student.unity_id}/>
                </Grid>
                <Avatar sx={{ width: 24, height: 24 }} src="/redx.png"/>
              </Grid>
            </ListItem>
        ))}
    </List>
    <h2></h2>
    <Grid container spacing={5} sx={{flexGrow: 1}}>
        <Grid xs={10} md={6}>
        <Button onClick={toggleStudentDialog} variant="contained" sx={{whiteSpace:'nowrap'}}>Add Student</Button>
        </Grid>
        <Grid xs={10} md={6}>
        <Button onClick={toggleUploadCSVDialog} variant="contained">Upload CSV</Button>
        </Grid>
    </Grid>
  
{/* <Dialog fullWidth open={confirmDeleteDialog} onClose={toggleDeleteDialog}>
  <DialogTitle id="del-res-dialog">Are you sure you want to delete <span style={{color:'#3366CC'}}>{resToDelete?.fil_name}</span>?</DialogTitle>
  <DialogContent dividers>
  <p style={{color:'red'}} id="errorMSG">{deleteErr}</p>
  </DialogContent>
    <DialogActions>
      <Button onClick={toggleDeleteDialog} color="secondary">Cancel</Button>
      <Button onClick={deleteFile} color="primary">Delete</Button>
    </DialogActions>
</Dialog> */}

<Dialog fullWidth open={uploadStudentDialog} onClose={toggleStudentDialog}>
  <DialogTitle id="add-course-dialog">Add Student</DialogTitle>
  <DialogContent dividers>
  <Grid container direction="column" spacing={2}>
          <Grid>
            <TextField
              autoFocus
              fullWidth
              margin="dense"
              id="formalName"
              label="Formal name"
              variant="standard"
              onChange={handleFormalName}
            />
          </Grid>
          <Grid>
            <TextField
              margin="dense"
              fullWidth
              id="preferredName"
              label="Preferred name"
              variant="standard"
              onChange={handlePreferredName}
            />
          </Grid>
          <Grid>
            <TextField
              margin="dense"
              fullWidth
              id="unityID"
              label="unity id"
              variant="standard"
              onChange={handleUnityID}
            />
          </Grid>
         
        </Grid>
  </DialogContent>
    <DialogActions>
      
      <Button onClick={toggleStudentDialog} color="secondary">Cancel</Button>
      <Button onClick={handleNewStudent} color="primary">Add</Button>
    </DialogActions>
</Dialog>

<Dialog fullWidth open={uploadCSVDialog} onClose={toggleUploadCSVDialog}>
  <DialogTitle id="add-course-dialog">Upload CSV</DialogTitle>
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
            />
          </Grid>
        </Grid>
  </DialogContent>
    <DialogActions>
      <Button onClick={toggleUploadCSVDialog} color="secondary">Cancel</Button>
      <Button onClick={toggleUploadCSVDialog} color="primary">Add</Button>
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