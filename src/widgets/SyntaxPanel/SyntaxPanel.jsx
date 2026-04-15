import { motion } from 'framer-motion'
import styles from './SyntaxPanel.module.css'

/**
 * Komut bazlı mini terminal akışları.
 * Her komut için 2-4 satırlık kısa senaryo.
 */
const miniFlows = {
  'git-init': [
    { type: 'cmd', text: '$ mkdir proje && cd proje' },
    { type: 'cmd', text: '$ git init' },
    { type: 'out', text: 'Initialized empty Git repository in /proje/.git/' },
  ],
  'git-config': [
    { type: 'cmd', text: '$ git config --global user.name "Elif"' },
    { type: 'cmd', text: '$ git config --global user.email "elif@mail.com"' },
    { type: 'cmd', text: '$ git config --list' },
    { type: 'out', text: 'user.name=Elif  user.email=elif@mail.com' },
  ],
  'git-add': [
    { type: 'cmd', text: '$ ls' },
    { type: 'out', text: 'index.html  style.css  app.js' },
    { type: 'cmd', text: '$ git add index.html style.css' },
  ],
  'git-commit': [
    { type: 'cmd', text: '$ git commit -m "feat: sayfa yapısı eklendi"' },
    { type: 'out', text: '[main a3f1b2c] feat: sayfa yapısı eklendi' },
    { type: 'out', text: ' 2 files changed, 34 insertions(+)' },
  ],
  'git-push': [
    { type: 'cmd', text: '$ git push -u origin main' },
    { type: 'out', text: 'To github.com:user/proje.git' },
    { type: 'out', text: '   a3f1b2c..d7e9c4f  main → main' },
  ],
  'git-pull': [
    { type: 'cmd', text: '$ git pull origin main' },
    { type: 'out', text: 'Updating a3f1b2c..d7e9c4f' },
    { type: 'out', text: 'Fast-forward  — 3 files changed' },
  ],
  'git-clone': [
    { type: 'cmd', text: '$ git clone https://github.com/user/proje.git' },
    { type: 'out', text: "Cloning into 'proje'..." },
    { type: 'out', text: 'Receiving objects: 100%, done.' },
  ],
  'git-branch': [
    { type: 'cmd', text: '$ git branch feature/login' },
    { type: 'cmd', text: '$ git branch' },
    { type: 'out', text: '* main' },
    { type: 'out', text: '  feature/login' },
  ],
  'git-merge': [
    { type: 'cmd', text: '$ git merge feature/login' },
    { type: 'out', text: "Merge made by the 'ort' strategy." },
    { type: 'out', text: ' 2 files changed, 45 insertions(+)' },
  ],
  'git-status': [
    { type: 'cmd', text: '$ git status' },
    { type: 'out', text: 'On branch main' },
    { type: 'out', text: 'Changes not staged: modified app.js' },
    { type: 'out', text: 'Untracked files: utils.js' },
  ],
  'git-log': [
    { type: 'cmd', text: '$ git log --oneline -3' },
    { type: 'out', text: 'd7e9c4f  feat: navbar eklendi' },
    { type: 'out', text: 'a3f1b2c  feat: sayfa yapısı' },
    { type: 'out', text: '1b2a3c4  initial commit' },
  ],
  'git-diff': [
    { type: 'cmd', text: '$ git diff app.js' },
    { type: 'out', text: '- const port = 3000;' },
    { type: 'out', text: '+ const port = process.env.PORT || 3000;' },
  ],
  'git-stash': [
    { type: 'cmd', text: '$ git stash push -m "geçici değişiklikler"' },
    { type: 'out', text: 'Saved working directory and index state' },
    { type: 'cmd', text: '$ git stash pop' },
  ],
  'git-checkout': [
    { type: 'cmd', text: '$ git checkout -b feature/search' },
    { type: 'out', text: "Switched to a new branch 'feature/search'" },
  ],
  'git-reset': [
    { type: 'cmd', text: '$ git reset --soft HEAD~1' },
    { type: 'out', text: 'HEAD is now at a3f1b2c feat: sayfa yapısı' },
    { type: 'cmd', text: '$ git status' },
    { type: 'out', text: 'Changes to be committed: modified app.js' },
  ],
  'git-rebase': [
    { type: 'cmd', text: '$ git rebase main' },
    { type: 'out', text: 'Applying: feat: arama eklendi' },
    { type: 'out', text: 'Successfully rebased and updated refs/heads/feature.' },
  ],
  'git-cherry-pick': [
    { type: 'cmd', text: '$ git cherry-pick d7e9c4f' },
    { type: 'out', text: '[main f1a2b3c] feat: navbar eklendi' },
    { type: 'out', text: ' 1 file changed, 12 insertions(+)' },
  ],
}

/**
 * SyntaxPanel - Yalnızca örnek kullanım mini akışını gösterir.
 */
function SyntaxPanel({ commandData }) {
  if (!commandData || !commandData.syntax) {
    return null
  }

  const flow = miniFlows[commandData.id] || []

  return (
    <motion.div
      className={styles.panel}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      key={commandData.id}
    >
      <div className={styles.flowSection}>
        <span className={styles.flowLabel}>Örnek Kullanım</span>
        <div className={styles.flowBlock}>
          {flow.map((line, index) => (
            <motion.div
              key={index}
              className={
                line.type === 'cmd' ? styles.flowCmd : styles.flowOut
              }
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.06, duration: 0.25 }}
            >
              {line.text}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default SyntaxPanel
