import styles from './MonitorFrame.module.css'

/**
 * MonitorFrame - Fiziksel monitor görünümünde çerçeve.
 * @param {string} title - Ekranda gösterilecek dijital başlık
 * @param {string} variant - local | remote | staging | stash
 * @param {React.ReactNode} children - Ekran içeriği
 * @param {string} className - Ek CSS sınıfı
 */
function MonitorFrame({
  title,
  variant = 'local',
  children,
  className = '',
}) {
  const variantLabels = {
    local: 'Yerel Depo',
    remote: 'GitHub',
    staging: 'Staging Area',
    stash: 'Stash',
  }

  const displayTitle = title || variantLabels[variant] || 'Monitor'

  return (
    <div className={`${styles.monitorWrapper} ${className}`}>
      {/* Monitör Kasası */}
      <div className={`${styles.monitorBezel} ${styles[variant]}`}>
        
        {/* Ekran (İçerik) */}
        <div className={styles.screen}>
          {/* İsteğe bağlı ekran başlığı (Tarayıcı barı gibi) */}
          <div className={styles.screenHeader}>
            <span className={styles.title}>{displayTitle}</span>
          </div>
          
          <div className={styles.content}>
            {children}
          </div>
          
          {/* Ekrana vuran diagonal parlama efekti */}
          <div className={styles.glare}></div>
        </div>

        {/* Alt Çerçeve ve Düğmeler */}
        <div className={styles.bottomBezel}>
          <div className={styles.buttons}>
            <span className={styles.buttonBlue}></span>
            <span className={styles.buttonGray}></span>
            <span className={styles.buttonGray}></span>
          </div>
        </div>
      </div>

      {/* Monitör Ayağı */}
      <div className={styles.standNeck}></div>
      <div className={styles.standBase}></div>
    </div>
  )
}

export default MonitorFrame
