import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '@widgets/Navbar'
import { CommandSidebar } from '@widgets/Sidebar'
import Footer from '@widgets/Footer'
import styles from './LearnLayout.module.css'

/**
 * LearnLayout - Ogrenme sayfasi iskeleti.
 * Navbar + Sidebar + Icerik + Footer
 */
function LearnLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev)
  const closeSidebar = () => setIsSidebarOpen(false)

  const hamburgerButton = (
    <button
      className={styles.hamburger}
      onClick={toggleSidebar}
      aria-label="Menu"
    >
      <span className={styles.hamburgerLine} />
      <span className={styles.hamburgerLine} />
      <span className={styles.hamburgerLine} />
    </button>
  )

  return (
    <div className={styles.layout}>
      <Navbar hamburgerButton={hamburgerButton} />

      <div className={styles.content}>
        {isSidebarOpen && (
          <div
            className={styles.overlay}
            onClick={closeSidebar}
            aria-hidden="true"
          />
        )}

        <aside className={`${styles.aside} ${isSidebarOpen ? styles.asideOpen : ''}`}>
          <CommandSidebar onCommandSelect={closeSidebar} />
        </aside>

        <main className={styles.main}>
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default LearnLayout
