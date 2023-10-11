import Head from 'next/head';
import styles from '@styles/Home.module.css';
import Link from 'next/link';
import NcsuHeader from 'components/NcsuHeader.js';
import OptionCard from 'components/OptionCard';
import DiscordCard from 'components/DiscordCard';
import SlackCard from 'components/SlackCard';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Unstable_Grid2';

export default function CourseInfo() {
  const router = useRouter();
  const { courseName } = router.query;

  const optionData = [ 
      {name: 'Manage Resources', path:'resources'},
      {name: 'Manage Roster', path:'roster'},
      {name: 'View Log', path:'log'},
      {name: 'Settings', path:'settings'},
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
          Course Info {courseName} 
        </h2>
        <h2>
          <Link href="/">Go Back</Link>
        </h2>
      <main className={styles.mainStyle}>
        

<Grid sx={{width:'80%',}} container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

    {optionData.map((option,index)=>(
      <Grid key={index} xs={6} sm={3}>
        <Link href={`/course/${courseName}/${option.path}`} style={{textDecoration:'none'}} passHref>
        <OptionCard optionTitle={option.name}></OptionCard>
        </Link>
          
        </Grid>
    ))}
</Grid>
<h2></h2>
<DiscordCard></DiscordCard>
<h2></h2>
<SlackCard></SlackCard>


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
