import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

/**
 * Navbar - Ust navigasyon cubugu.
 * Logo + site adi + arama (ogrenim sayfasinda)
 */
function Navbar({ searchBar, hamburgerButton }) {
  const location = useLocation()
  const isLearnPage = location.pathname.startsWith('/learn')

  return (
    <nav className={styles.navbar} role="navigation" aria-label="Ana navigasyon">
      {hamburgerButton}

      <Link to="/" className={styles.logo}>
        <img src="/logo.png" alt="mergeMind Logo" className={styles.logoImage} />
        <span className={styles.logoText}>mergeMind</span>
      </Link>

      {isLearnPage && searchBar && (
        <div className={styles.search}>
          {searchBar}
        </div>
      )}
    </nav>
  )
}

export default Navbar
