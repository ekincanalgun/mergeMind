import { motion } from 'framer-motion'
import styles from './CommandItem.module.css'

/**
 * CommandItem - Sidebar'daki tek komut itemi.
 * @param {object} command - { id, name, category }
 * @param {boolean} isActive - Aktif mi
 * @param {function} onClick - Tiklama handler
 */
function CommandItem({ command, isActive, onClick }) {
  return (
    <motion.button
      className={`${styles.item} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className={styles.name}>{command.name}</span>
    </motion.button>
  )
}

export default CommandItem
