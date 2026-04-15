import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CommandItem from './CommandItem'
import SearchBar from '@shared/ui/SearchBar'
import styles from './CommandSidebar.module.css'

/**
 * Sidebar icin komut kategori yapisi.
 * features/index.js kurulmadan once sabit liste kullaniliyor.
 */
const COMMAND_LIST = [
  { id: 'git-init', name: 'git init', category: 'Başlatma' },
  { id: 'git-config', name: 'git config', category: 'Başlatma' },
  { id: 'git-add', name: 'git add', category: 'Temel' },
  { id: 'git-commit', name: 'git commit', category: 'Temel' },
  { id: 'git-status', name: 'git status', category: 'Temel' },
  { id: 'git-log', name: 'git log', category: 'Temel' },
  { id: 'git-push', name: 'git push', category: 'Paylaşım' },
  { id: 'git-pull', name: 'git pull', category: 'Paylaşım' },
  { id: 'git-clone', name: 'git clone', category: 'Paylaşım' },
  { id: 'git-branch', name: 'git branch', category: 'Dallanma' },
  { id: 'git-merge', name: 'git merge', category: 'Dallanma' },
  { id: 'git-checkout', name: 'git checkout', category: 'Dallanma' },
  { id: 'git-rebase', name: 'git rebase', category: 'Dallanma' },
  { id: 'git-cherry-pick', name: 'git cherry-pick', category: 'Dallanma' },
  { id: 'git-reset', name: 'git reset', category: 'Geri Alma' },
  { id: 'git-diff', name: 'git diff', category: 'Diğer' },
  { id: 'git-stash', name: 'git stash', category: 'Diğer' },
]

const CATEGORY_ORDER = ['Başlatma', 'Temel', 'Paylaşım', 'Dallanma', 'Geri Alma', 'Diğer']

function CommandSidebar({ onCommandSelect }) {
  const { commandId } = useParams()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const activeId = commandId || 'git-init'

  const filteredCommands = useMemo(() => {
    if (!searchQuery.trim()) return COMMAND_LIST
    const query = searchQuery.toLowerCase()
    return COMMAND_LIST.filter(cmd =>
      cmd.name.toLowerCase().includes(query) ||
      cmd.id.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const groupedCommands = useMemo(() => {
    const groups = {}
    CATEGORY_ORDER.forEach(cat => { groups[cat] = [] })
    filteredCommands.forEach(cmd => {
      if (groups[cmd.category]) {
        groups[cmd.category].push(cmd)
      }
    })
    return groups
  }, [filteredCommands])

  const handleSelect = (cmd) => {
    navigate(`/learn/${cmd.id}`)
    if (onCommandSelect) onCommandSelect(cmd)
  }

  return (
    <div className={styles.sidebar} role="navigation" aria-label="Komut listesi">
      <div className={styles.searchWrapper}>
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery('')}
          placeholder="Komut ara..."
        />
      </div>

      <div className={styles.commandList}>
        {CATEGORY_ORDER.map(category => {
          const commands = groupedCommands[category]
          if (!commands || commands.length === 0) return null

          return (
            <div key={category} className={styles.category}>
              <h6 className={styles.categoryTitle}>{category}</h6>
              {commands.map(cmd => (
                <CommandItem
                  key={cmd.id}
                  command={cmd}
                  isActive={cmd.id === activeId}
                  onClick={() => handleSelect(cmd)}
                />
              ))}
            </div>
          )
        })}

        {filteredCommands.length === 0 && (
          <p className={styles.noResults}>Sonuç bulunamadı</p>
        )}
      </div>
    </div>
  )
}

export default CommandSidebar
