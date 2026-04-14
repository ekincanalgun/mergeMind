import styles from './Button.module.css'

/**
 * Button - Genel buton componenti.
 * @param {string} variant - primary | secondary | ghost
 * @param {string} size - sm | md | lg
 * @param {boolean} fullWidth - Tam genislik
 * @param {boolean} disabled - Devre disi
 * @param {React.ReactNode} icon - Sol tarafta ikon
 * @param {React.ReactNode} children - Buton icerigi
 */
function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  icon,
  children,
  className = '',
  ...props
}) {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button
      className={classNames}
      disabled={disabled}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  )
}

export default Button
