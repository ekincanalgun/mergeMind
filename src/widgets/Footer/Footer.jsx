import styles from './Footer.module.css'

/**
 * Footer - Site alt bilgi alani.
 */
function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.content}>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} mergeMind
        </p>
        <p className={styles.tagline}>
          Git öğrenme platformu
        </p>
      </div>
    </footer>
  )
}

export default Footer
