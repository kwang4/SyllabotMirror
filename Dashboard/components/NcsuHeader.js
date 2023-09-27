import styles from './NcsuHeader.module.css';

function NcsuHeader(props) {
  return (
    <div className={styles.header}>
      <h1>{props.children}</h1>
      <div className={styles.profileWrapper}>
      <h3 className={styles.profileName}>Big Chungus</h3>
      <img src="/pfp.png" alt="Profile Image" className={styles.profileImage} />
      </div>

    </div>
  );
}

export default NcsuHeader;