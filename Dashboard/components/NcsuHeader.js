import styles from './NcsuHeader.module.css';
const axios = require('axios');
import { useEffect, useState } from 'react';
import APIModule from '@components/APIModule.js';
function NcsuHeader(props) {
  const [userID,setUserID] = useState();
  useEffect(()=>{

    async function fetchUserData()
    {
      const response = await APIModule.get('/shib');
      if(response?.data != null)
      {
        setUserID(response.data.first_name + " " + response.data.last_name);
      }
      
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