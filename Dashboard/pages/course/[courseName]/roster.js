import Head from 'next/head';
import styles from '@styles/Home.module.css';
import Link from 'next/link';
import NcsuHeader from '@components/NcsuHeader.js';
import AddNewStudentCard from '@components/AddNewStudentCard';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { ListItem } from '@mui/material'
import ListItemText from '@mui/material/ListItemText';;
import Avatar from '@mui/material/Avatar';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useRouter } from 'next/router';

export default function Roster() {
    const router = useRouter();
    const { courseName } = router.query;
  const studentData = [ 
      {name: 'Jackson Hall', unityId: 'jdhall9'},
      {name: 'Daniel Buchanan', unityId: 'dsbuchan'},
      {name: 'Brandon Partin', unityId: 'blpartin'},
      {name: 'Collin Riggs', unityId: 'cmriggs'},
      {name: 'Kai-En Wang', unityId: 'kwang23'}
  ];


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
          <Link href={`/course/${courseName}`}>Go Back</Link>
        </h2>
      <main className={styles.mainStyle}>
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#cfcfcf', border: 1, borderRadius: '10%' }}>
        <List>
            <ListItem><ListItemText primary="Name"/><ListItemText primary="Unity ID"/></ListItem>
        {studentData.map((student,index)=>(
            <ListItem key={index}>
              <ListItemText primary={student.name}/>
              <ListItemText primary = {student.unityId}/>
              <Avatar sx={{ width: 24, height: 24 }} src="/redx.png"/>
            </ListItem>
        ))}
        </List>
    </Box>
    <h2></h2>
    <AddNewStudentCard></AddNewStudentCard>


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