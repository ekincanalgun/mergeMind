import { useRef } from 'react'
import styles from './SearchBar.module.css'

/**
 * SearchBar - Arama input componenti.
 * @param {string} value - Input degeri
 * @param {function} onChange - Degisiklik handler
 * @param {string} placeholder - Placeholder text
 * @param {function} onClear - Temizle handler
 */
function SearchBar({
  value = '',
  onChange,
  placeholder = 'Komut ara...',
  onClear,
  className = '',
}) {
  const inputRef = useRef(null)

  const handleClear = () => {
    if (onClear) onClear()
    inputRef.current?.focus()
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <svg
        className={styles.icon}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>

      <input
        ref={inputRef}
        type="text"
        className={styles.input}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label="Komut ara"
      />

      {value && (
        <button
          className={styles.clearButton}
          onClick={handleClear}
          aria-label="Aramayi temizle"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default SearchBar
