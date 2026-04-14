import { useEffect, useRef, useState } from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-bash'
import styles from './CodeBlock.module.css'

/**
 * CodeBlock - Syntax-highlighted kod kutusu.
 * @param {string} code - Gosterilecek kod
 * @param {string} language - Dil (bash, javascript, text)
 * @param {string} title - Baslık (opsiyonel)
 * @param {boolean} showLineNumbers - Satir numaralari
 * @param {boolean} copyable - Kopyala butonu
 */
function CodeBlock({
  code,
  language = 'bash',
  title,
  showLineNumbers = false,
  copyable = true,
}) {
  const codeRef = useRef(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
    }
  }, [code, language])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* Clipboard API desteklenmiyorsa sessizce gec */
    }
  }

  const lines = code.split('\n')

  return (
    <div className={styles.container}>
      {title && (
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          {copyable && (
            <button
              className={styles.copyButton}
              onClick={handleCopy}
              aria-label="Kodu kopyala"
            >
              {copied ? 'Kopyalandi' : 'Kopyala'}
            </button>
          )}
        </div>
      )}

      <div className={styles.codeWrapper}>
        {showLineNumbers && (
          <div className={styles.lineNumbers} aria-hidden="true">
            {lines.map((_, i) => (
              <span key={i} className={styles.lineNumber}>{i + 1}</span>
            ))}
          </div>
        )}

        <pre className={styles.pre}>
          <code ref={codeRef} className={`language-${language}`}>
            {code}
          </code>
        </pre>

        {!title && copyable && (
          <button
            className={styles.copyButtonFloat}
            onClick={handleCopy}
            aria-label="Kodu kopyala"
          >
            {copied ? 'Kopyalandi' : 'Kopyala'}
          </button>
        )}
      </div>
    </div>
  )
}

export default CodeBlock
