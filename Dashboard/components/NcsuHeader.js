import styles from './NcsuHeader.module.css';

function NcsuHeader(props) {
  return (
    <div className={styles.header}>
      <h1>{props.children}</h1>
      <img src="/pfp.png" alt="Profile Image" className={styles.profileImage} />
    </div>
  );
}

export default NcsuHeader;