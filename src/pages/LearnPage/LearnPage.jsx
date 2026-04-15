import { useParams } from 'react-router-dom'
import { PlaygroundArea } from '@widgets/Playground'
import { SyntaxPanel } from '@widgets/SyntaxPanel'
import { UsagePanel } from '@widgets/UsagePanel'
import { ExplanationPanel } from '@widgets/ExplanationPanel'
import gitCommandsData from '../../data/gitCommandsData'
import styles from './LearnPage.module.css'

/**
 * LearnPage - Ogrenme sayfasi ana container.
 * Siralama: Ornek Kullanim > Playground > Kullanim Sekilleri > Aciklama
 */
function LearnPage() {
  const { commandId } = useParams()
  const activeCommand = commandId || 'git-init'
  const commandData = gitCommandsData[activeCommand] || null

  return (
    <div className={styles.page}>
      <div className={styles.commandHeader}>
        <h2 className={styles.commandName}>
          {commandData ? commandData.name : activeCommand}
        </h2>
      </div>

      <section className={styles.syntaxArea}>
        <SyntaxPanel commandData={commandData} />
      </section>

      <section className={styles.playgroundArea}>
        <PlaygroundArea activeCommand={activeCommand} />
      </section>

      <section className={styles.usageArea}>
        <UsagePanel commandData={commandData} />
      </section>

      <section className={styles.explanationArea}>
        <ExplanationPanel commandData={commandData} />
      </section>
    </div>
  )
}

export default LearnPage
