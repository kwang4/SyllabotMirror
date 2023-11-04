import Head from 'next/head';
import styles from '@styles/Home.module.css';
import Link from 'next/link';
import NcsuHeader from '@components/NcsuHeader.js';
import APIModule from '@components/APIModule';
import FileUploadCard from '@components/FileUploadCard';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import List from '@mui/material/List';
import { ListItem } from '@mui/material'
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
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

export default function Resources() {
    const router = useRouter();
    const { semesterID, courseName } = router.query;
  const resourceList = [ 
      {name: 'Syllabus', type: 'PDF'},
      {name: 'Hw1', type: 'txt'},
      {name: 'HW2', type: 'txt'},
      {name: 'Syllabus', type: 'PDF'},
      {name: 'Hw1', type: 'txt'},
      {name: 'HW2', type: 'txt'},
      {name: 'Syllabus', type: 'PDF'},
      {name: 'Hw1', type: 'txt'},
      {name: 'HW2', type: 'txt'},
  ];

  const [uploadFileDialog,setUploadStudentDialog] = useState(false);
  const [courseResources, setCourseResources] = useState([]);
  const toggleFileDialog = ()=>
{
  if(uploadFileDialog)
    setUploadStudentDialog(false);
  else
    setUploadStudentDialog(true);
}

async function getCourseResources()
{
  if(semesterID != null)
  {
    const splitIdx = courseName.lastIndexOf('-');
    const splitCourseName = encodeURIComponent(courseName.slice(0,splitIdx));
    const splitCourseSection = encodeURIComponent(courseName.slice(splitIdx+1));
    const courseResponse = await APIModule.get(`/semesters/${semesterID}/courses/courseName/${splitCourseName}`);
    if(courseResponse.status != 200)
    {
      console.log("Error getting course object by name");
      return;
    }
    const courseObj = courseResponse.data;
    const resourceResponse = await APIModule.get(`/semesters/${semesterID}/courses/${courseObj.courseID}/sections/${splitCourseSection}/resources`);
    
    if(resourceResponse?.status != 200)
    {
      console.log("Error getting course resources");
      return;
    }
    setCourseResources(resourceResponse.data);
    console.log(resourceResponse.data);
  }
}

useEffect(()=>{
  getCourseResources();
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
          Manage Resources 
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
              <Grid item xs={5.5}>
                 <ListItemText sx={{variant:"h1"}} primary={'Resource Name'}/>
              </Grid>
              <Grid item xs={5.5}>
               <ListItemText primary = {'Type'}/>
              </Grid>
            </Grid>
            </ListItem>
            <Divider sx={{borderBottomWidth: 3,borderColor:'black'}}/>
      {courseResources.map((resource,index)=>(
            <ListItem key={index+1}>
            <Grid container spacing={0} sx={{width:'100%'}}>
              <Grid item xs={5.5}>
                 <ListItemText primary={resource.fil_name}/>
              </Grid>
              <Grid item xs={5.5}>
               <ListItemText primary = {'txt'}/>
              </Grid>
              <Grid item xs={1}>
              <Avatar sx={{ width: 24, height: 24 }} src="/redx.png"/>
              </Grid>
              
            </Grid>
            </ListItem>
        ))}
    </List>
    <h2></h2>
    
<FileUploadCard/>

<h2></h2>

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