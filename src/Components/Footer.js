import styles from "../css/Footer.module.css";

export default function Footer() {
    return (
        <div className={styles.totalWrap}>
            <div className={styles.mainInfo}>
                <p className={styles.mainSerName}>@StyleScanner</p>
                <a href="https://github.com/comprehensive-design" className={styles.mainReadme}>ReadMe</a>
                <a href="https://github.com/comprehensive-design" className={styles.mainEmail}>contact</a>
                <a href="https://github.com/comprehensive-design" className={styles.mainGitAddr}>github</a>
            </div>

            <div className={styles.etcInfo}>
                <p className={styles.etcInfoWord}>yu cse</p>
                <p className={styles.etcInfoWord}>graduation products</p>
                <p className={styles.etcInfoWord}>https://github.com/comprehensive-design</p>
                <p className={styles.etcInfoWord}>Stytle Scanner</p>
            </div>
        </div>
    )
}