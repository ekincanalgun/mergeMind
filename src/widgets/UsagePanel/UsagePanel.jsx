import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './UsagePanel.module.css'

/**
 * UsagePanel - Tıklanabilir ve kopyalanabilir kullanım şekilleri.
 */
function UsagePanel({ commandData }) {
  const [copiedIndex, setCopiedIndex] = useState(null)

  if (!commandData || !commandData.syntax) {
    return null
  }

  const { syntax } = commandData

  const handleCopy = async (command, index) => {
    try {
      await navigator.clipboard.writeText(command)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 1500)
    } catch {
      // Fallback
      const textarea = document.createElement('textarea')
      textarea.value = command
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 1500)
    }
  }

  return (
    <motion.div
      className={styles.panel}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      key={commandData.id}
    >
      <h4 className={styles.title}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 17 10 11 4 5"></polyline>
          <line x1="12" y1="19" x2="20" y2="19"></line>
        </svg>
        Kullanım Şekilleri
      </h4>
      <div className={styles.list}>
        {syntax.usage.map((item, index) => (
          <motion.div
            key={index}
            className={styles.item}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.04, duration: 0.3 }}
            onClick={() => handleCopy(item.command, index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleCopy(item.command, index)
            }}
          >
            <div className={styles.itemHeader}>
              <code className={styles.command}>{item.command}</code>
              <div className={styles.copyArea}>
                <AnimatePresence mode="wait">
                  {copiedIndex === index ? (
                    <motion.span
                      key="copied"
                      className={styles.copiedBadge}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Kopyalandı
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      className={styles.copyHint}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <span className={styles.desc}>{item.description}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default UsagePanel