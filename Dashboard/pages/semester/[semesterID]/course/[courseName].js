import Head from 'next/head';
import styles from '@styles/Home.module.css';
import Link from 'next/link';
import NcsuHeader from 'components/NcsuHeader.js';
import APIModule from '@components/APIModule.js';
import OptionCard from 'components/OptionCard';
import DiscordCard from 'components/DiscordCard';
import SlackCard from 'components/SlackCard';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

export default function CourseInfo() {
  const router = useRouter();
  const { semesterID, courseName } = router.query;
  const [slackDialogStatus,setSlackDialogStatus] = useState(false);
  const [slackLinked,setSlackLinkedStatus] = useState(false);
  const [discordDialogStatus,setDiscordDialogStatus] = useState(false);
  const [discordLinked,setDiscordLinkedStatus] = useState(false);
  const [slackToken, setSlackToken] = useState('');
  const [signingSecret, setSigningSecret] = useState('');
  const [socketToken, setSocketToken] = useState('');

  const optionData = [ 
      {name: 'Manage Resources', path:'resources'},
      {name: 'Manage Roster', path:'roster'},
      {name: 'View Log', path:'log'},
      {name: 'Settings', path:'settings'},
  ];

  async function validateCourse()
  {
    return;
    const splitIdx = courseName.lastIndexOf('-');
    const section = courseName.split(splitIdx+1);
    const name = courseName.split(0,splitIdx);
    console.log(name + " " + section);
  }

  async function linkToSlack()
  {
    const slackData  = {
      'slackToken': slackToken,
      'signingSecret': signingSecret,
      'socketToken': socketToken
    }
    // const response = await APIModule.get(`https://localhost/api/semesters/${semesterSelector}/courses`,slackData);

    const response = slackData;
    console.log(response);
    setSlackLinkedStatus(true);

    window.location.reload();
  }

  async function unlinkToSlack()
  {
    const slackData  = {
      'slackToken': "",
      'signingSecret': "",
      'socketToken': ""
    }
    // const response =  await APIModule.get(`https://localhost/api/semesters/${semesterSelector}/courses`,slackData);

    const response = slackData;

    console.log(response);
    setSlackLinkedStatus(false);

    window.location.reload();
  }

  async function linkToDiscord()
  {
    const discordData  = {
      'slackToken': slackToken,
      'signingSecret': signingSecret,
      'socketToken': socketToken
    }
    // const response = await APIModule.get(`https://localhost/api/semesters/${semesterSelector}/courses`,slackData);

    const response = discordData;
    console.log(response);
    setDiscordLinkedStatus(true);

    window.location.reload();
  }

  async function unlinkToDiscord()
  {
    const discordData  = {
      'slackToken': "",
      'signingSecret': "",
      'socketToken': ""
    }
    // const response = await APIModule.get(`https://localhost/api/semesters/${semesterSelector}/courses`,slackData);

    const response = discordData;

    console.log(response);
    setDiscordLinkedStatus(false);

    window.location.reload();
  }

  function toggleSlackDialog()
  {
  if(slackDialogStatus)
    setSlackDialogStatus(false);
  else
    setSlackDialogStatus(true);
  }
  function toggleDiscordDialog()
  {
  if(discordDialogStatus)
    setDiscordDialogStatus(false);
  else
    setDiscordDialogStatus(true);
  }
  const handleSlackToken = (event) =>{
    setSlackToken(event.target.value);
  }
  const handleSigningSecret = (event) =>{
    setSigningSecret(event.target.value);
  }
  const handleSocketToken = (event) =>{
    setSocketToken(event.target.value);
  }

  useEffect(()=>{
    validateCourse();
  },[]);

  return (
    <div className={styles.container}>
      <Head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Syllabot</title>
        <link rel="icon" href="/react.ico" />
      </Head>
      <NcsuHeader>Syllabot</NcsuHeader>
      <h2 className={styles.title}>
           {courseName?.replace('-',' ')} 
        </h2>
        <h2>
          <Link href="/">Go Back</Link>
        </h2>
      <main className={styles.mainStyle}>
        

<Grid sx={{width:'80%',}} container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

    {optionData.map((option,index)=>(
      <Grid key={index} xs={6} sm={3}>
        <Link href={`/semester/${semesterID}/course/${courseName}/${option.path}`} style={{textDecoration:'none'}} passHref>
        <OptionCard optionTitle={option.name}></OptionCard>
        </Link>
          
        </Grid>
    ))}
</Grid>
<h2></h2>
<Box sx={{ minWidth: 14/18, minHeight: 80, }} onClick={toggleDiscordDialog}><DiscordCard></DiscordCard></Box>
<h2></h2>
<Box sx={{ minWidth: 14/18, minHeight: 80, }} onClick={toggleSlackDialog}><SlackCard></SlackCard></Box>

<Dialog fullWidth open={discordDialogStatus} onClose={toggleDiscordDialog}>
  <DialogTitle id="link-to-slack-dialog">Manage Discord Connection - <Link target = "_blank" href="https://github.ncsu.edu/engr-csc-sdc/2023FallTeam06-Syllabot/blob/slack/Slack/README.md" color="primary">Discord Setup Tutorial</Link></DialogTitle>
  <DialogContent dividers>
  <Grid container direction="column" spacing={2}>
          <Grid>
            <TextField
              autoFocus
              fullWidth
              margin="dense"
              id="slackToken"
              label="Slack Token"
              variant="standard"
              onChange={handleSlackToken}
            />
          </Grid>
          <Grid>
            <TextField
              margin="dense"
              fullWidth
              id="signingSecret"
              label="Signing Secret"
              variant="standard"
              onChange={handleSigningSecret}
            />
          </Grid>
          <Grid>
            <TextField
              margin="dense"
              fullWidth
              id="socketToken"
              label="Socket Token"
              variant="standard"
              onChange={handleSocketToken}
            />
          </Grid>
        </Grid>
  </DialogContent>
    <DialogActions>
      <Button onClick={unlinkToDiscord} color="primary" sx={{ alignItems: 'flex-start' }}>Remove Connection</Button>
      <Box flexGrow={1}></Box>
      <Button onClick={toggleDiscordDialog} color="secondary">Cancel</Button>
      <Button onClick={linkToDiscord} color="primary">Confirm</Button>
    </DialogActions>
  
</Dialog>


<Dialog fullWidth open={slackDialogStatus} onClose={toggleSlackDialog}>
  <DialogTitle id="link-to-slack-dialog">Manage Slack Connection - <Link target = "_blank" href="https://github.ncsu.edu/engr-csc-sdc/2023FallTeam06-Syllabot/blob/slack/Slack/README.md" color="primary">Slack Setup Tutorial</Link></DialogTitle>
  <DialogContent dividers>
  <Grid container direction="column" spacing={2}>
          <Grid>
            <TextField
              autoFocus
              fullWidth
              margin="dense"
              id="slackToken"
              label="Slack Token"
              variant="standard"
              onChange={handleSlackToken}
            />
          </Grid>
          <Grid>
            <TextField
              margin="dense"
              fullWidth
              id="signingSecret"
              label="Signing Secret"
              variant="standard"
              onChange={handleSigningSecret}
            />
          </Grid>
          <Grid>
            <TextField
              margin="dense"
              fullWidth
              id="socketToken"
              label="Socket Token"
              variant="standard"
              onChange={handleSocketToken}
            />
          </Grid>
        </Grid>
  </DialogContent>
    <DialogActions>
      <Button onClick={unlinkToSlack} color="primary" sx={{ alignItems: 'flex-start' }}>Remove Connection</Button>
      <Box flexGrow={1}></Box>
      <Button onClick={toggleSlackDialog} color="secondary">Cancel</Button>
      <Button onClick={linkToSlack} color="primary">Confirm</Button>
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
