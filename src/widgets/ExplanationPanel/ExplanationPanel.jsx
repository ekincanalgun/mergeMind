import { motion } from 'framer-motion'
import styles from './ExplanationPanel.module.css'

/**
 * ExplanationPanel - Git komutlarının makale tarzı açıklama paneli.
 * İçerik: Başlık, açıklayıcı paragraflar, ipuçları ve uyarılar.
 */
function ExplanationPanel({ commandData }) {
  if (!commandData || !commandData.explanation) {
    return null
  }

  const { explanation } = commandData

  return (
    <motion.div
      className={styles.panel}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
      key={commandData.id}
    >
      {/* Makale Başlığı */}
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
        </div>
        <h3 className={styles.title}>{explanation.title}</h3>

      </div>

      {/* Makale İçeriği */}
      <div className={styles.content}>
        {explanation.paragraphs.map((paragraph, index) => (
          <motion.p
            key={index}
            className={styles.paragraph}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.08, duration: 0.35 }}
          >
            {renderFormattedText(paragraph)}
          </motion.p>
        ))}
      </div>

      {/* İpuçları ve Uyarılar */}
      <div className={styles.footer}>
        {/* İpuçları */}
        {explanation.tips && explanation.tips.length > 0 && (
          <div className={styles.tipsSection}>
            <h4 className={styles.sectionTitle}>
              <svg className={styles.sectionIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18h6"></path><path d="M10 22h4"></path>
                <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"></path>
              </svg>
              İpuçları
            </h4>
            <ul className={styles.tipList}>
              {explanation.tips.map((tip, index) => (
                <motion.li
                  key={index}
                  className={styles.tipItem}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.06, duration: 0.3 }}
                >
                  {renderFormattedText(tip)}
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Uyarılar */}
        {explanation.warnings && explanation.warnings.length > 0 && (
          <div className={styles.warningsSection}>
            <h4 className={styles.sectionTitle}>
              <svg className={styles.sectionIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              Dikkat
            </h4>
            <ul className={styles.warningList}>
              {explanation.warnings.map((warning, index) => (
                <motion.li
                  key={index}
                  className={styles.warningItem}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.06, duration: 0.3 }}
                >
                  {renderFormattedText(warning)}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  )
}

/**
 * Backtick içindeki metinleri <code> etiketine dönüştürür
 */
function renderFormattedText(text) {
  const parts = text.split(/(`[^`]+`)/g)
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className={styles.inlineCode}>{part.slice(1, -1)}</code>
    }
    return part
  })
}

export default ExplanationPanel
