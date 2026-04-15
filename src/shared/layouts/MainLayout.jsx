import { Outlet } from 'react-router-dom'
import Navbar from '@widgets/Navbar'
import Footer from '@widgets/Footer'
import styles from './MainLayout.module.css'

/**
 * MainLayout - Ana sayfa iskeleti.
 * Navbar + Icerik + Footer
 */
function MainLayout() {
  return (
    <div className={styles.layout}>
      <Navbar />

      <main className={styles.main}>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default MainLayout
