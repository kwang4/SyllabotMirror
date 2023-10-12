import styles from './NcsuHeader.module.css';
const axios = require('axios');
import { useEffect, useState } from 'react';
function NcsuHeader(props) {
  const [userID,setUserID] = useState();
  useEffect(()=>{

    async function fetchUserData()
    {
      const response = await axios.get('https://localhost/api/shib').catch(error=>{console.log(error)});
      setUserID(response.data.first_name + " " + response.data.last_name);
    }
    fetchUserData();
  },[]);
  return (
    <div className={styles.header}>
      <h1>{props.children}</h1>
      <div className={styles.profileWrapper}>
      <h3 className={styles.profileName}>{userID}</h3>
      <img src="/pfp.png" alt="Profile Image" className={styles.profileImage} />
      </div>

    </div>
  );
}

export default NcsuHeader;