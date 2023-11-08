import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2'; // Make sure that this import is correct
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useRouter } from 'next/router';

import APIModule from './APIModule';


// Define the styled component outside of the component function to avoid re-creating it on each render
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function FileUploadCard() {
  const router = useRouter();
  const { semesterID,courseName } = router.query;
  const [file, setFile] = useState(null);
  const [uploadFileDialog,setUploadStudentDialog] = useState(false);
  const [fileNameHTML,setFileNameHTML] = useState('');
  const [errorMsg,setErrorMsg] = useState('');
  const toggleFileDialog = ()=>
  {
    setFile(null);
    setFileNameHTML('');
    setErrorMsg('');
    if(uploadFileDialog)
      setUploadStudentDialog(false);
   else
     setUploadStudentDialog(true);
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      // Using console.log(file) is fine for debugging but ensure it's not causing the issue
      console.log(file);
    }
    setFileNameHTML(file.name);
  };

  async function uploadFile()
  {
    if(semesterID != null && courseName != null)
    {
      const splitIdx = courseName.lastIndexOf('-');
      const splitCourseName = encodeURIComponent(courseName.slice(0,splitIdx));
      const splitCourseSection = encodeURIComponent(courseName.slice(splitIdx+1));
      const courseResponse = await APIModule.get(`/semesters/${semesterID}/courses/courseName/${splitCourseName}`);
      if(courseResponse.status != 200)
      {
        setErrorMsg('Unable to Upload File');
        console.log("Error getting course object by name");
        return;
      }
      const courseObj = courseResponse.data;
      const formData = new FormData();
      formData.append('file',file);
      const resourceResponse = await APIModule.post(`/semesters/${semesterID}/courses/${courseObj.courseID}/sections/${splitCourseSection}/resources`,formData);
      
      if(resourceResponse?.status != 200)
      {
        setErrorMsg('Unable to Upload File');
        console.log("Error getting course resources");
        return;
      }
      console.log(resourceResponse);
    }
    window.location.reload();
  }

  return (

<div>
<Grid container spacing={5} sx={{flexGrow: 1}}>
    <Grid xs={10} md={6}>
    <Button onClick={toggleFileDialog} variant="contained" sx={{whiteSpace:'nowrap'}}>Upload Resource</Button>
    </Grid>
</Grid>

<Dialog fullWidth open={uploadFileDialog} onClose={toggleFileDialog}>
  <DialogTitle id="add-course-dialog">Upload Resource</DialogTitle>
  <DialogContent dividers>
  <Grid container direction="column" spacing={2}>
      <Grid xs={12}>
        <Button component="label" variant="contained">
          Choose File
          <VisuallyHiddenInput
            type="file"
            onChange={handleFileChange}
          />
        </Button>
        <p id="fileNameHTML">{fileNameHTML}</p>
        <p style={{color:'red'}} id="errorMSG">{errorMsg}</p>
      </Grid>
    </Grid>
  </DialogContent>
    <DialogActions>
      <Button onClick={toggleFileDialog} color="secondary">Cancel</Button>
      <Button onClick={uploadFile} color="primary">Upload</Button>
    </DialogActions>
</Dialog>
</div>

  );
}
