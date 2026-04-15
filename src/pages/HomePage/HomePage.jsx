import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'

/**
 * HomePage - Ana sayfa (landing page).
 * Tam tasarim ASAMA 10'da yapilacak.
 */
function HomePage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <img
          src="/logo.png"
          alt="mergeMind Logo"
          className={styles.logo}
        />
        <h1 className={styles.title}>mergeMind</h1>
        <p className={styles.subtitle}>
          Git komutlarını görsel animasyonlarla öğren
        </p>
        <Link to="/learn/git-init" className={styles.cta}>
          Öğrenmeye Başla
        </Link>
      </section>
    </div>
  )
}

export default HomePage
