import styles from './loader.module.css';

function Loader(): JSX.Element {
  return (
    <div className={styles.middle}>
      <div className={`${styles.bar} ${styles.bar1}`} />
      <div className={`${styles.bar} ${styles.bar2}`} />
      <div className={`${styles.bar} ${styles.bar3}`} />
      <div className={`${styles.bar} ${styles.bar4}`} />
      <div className={`${styles.bar} ${styles.bar5}`} />
      <div className={`${styles.bar} ${styles.bar6}`} />
      <div className={`${styles.bar} ${styles.bar7}`} />
      <div className={`${styles.bar} ${styles.bar8}`} />
    </div>
  );
}

export default Loader;
