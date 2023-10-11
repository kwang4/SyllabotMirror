import Head from 'next/head';
import styles from '@styles/Home.module.css';
const axios = require('axios');
import Link from 'next/link'
import NcsuHeader from '@components/NcsuHeader.js';
import ClassCard from '@components/ClassCard';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';

export default function Home() {                    
  const [classDat,setClassDat] = useState([]);
  useEffect(()=>{

    async function fetchClassData()
    {
      const response = await axios.get('https://localhost/api/semesters/1/courses').catch(error=>{console.log(error)});
    setClassDat(response.data);
    console.log(response.data);
    }
    fetchClassData();
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
          Courses
        </h2>
      <main className={styles.mainStyle}>
        

<Grid sx={{width:'80%',}} container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

{classDat.map((card, index) => (
  <Grid key={index} xs={6} sm={4}>
    <Link href={`/course/${card.CourseName}`} style={{textDecoration:'none'}} passHref>
        <ClassCard classTitle={card.CourseName} classInstructors={card.instructor} />
    </Link>
  </Grid>
))}
</Grid>


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
