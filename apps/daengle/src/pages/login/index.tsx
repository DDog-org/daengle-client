import styles from './index.modules.scss';

export default function Login() {
  return (
    <div className={styles.wrapper}>
      <button className={styles.buttonBox}>
        <span className={styles.buttonTextBox}>카카오톡으로 시작하기</span>
      </button>
    </div>
  );
}
