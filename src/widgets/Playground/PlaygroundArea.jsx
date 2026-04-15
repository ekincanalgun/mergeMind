import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MonitorFrame from '@shared/ui/MonitorFrame'
import styles from './PlaygroundArea.module.css'

// --- Geçiş Ayarları ---
const springTransition = { type: "spring", stiffness: 300, damping: 25 }

// --- Profesyonel Örnek Bileşenler ---
const MockFileItem = ({ name, status, layoutId }) => {
  const getStatusColor = () => {
    switch(status) {
      case 'modified': return 'var(--color-warning)'; // Turuncu/Sari
      case 'staged': return 'var(--color-success)'; // Yeşile çalan mavi
      case 'untracked': return 'var(--color-info)';
      case 'deleted': return 'var(--color-error)';
      default: return 'var(--color-text-secondary)';
    }
  }
  
  return (
    <motion.div 
      layout 
      layoutId={layoutId} // Framer Motion büyüsü
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={springTransition}
      style={{
        display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px',
        backgroundColor: 'var(--color-darker)', border: '1px solid var(--color-border)',
        borderRadius: '6px', marginBottom: '8px', color: 'var(--color-text-primary)'
      }}
    >
      <span style={{color: getStatusColor()}}>📄</span>
      <span style={{flex: 1, fontSize: '0.85rem', fontFamily: 'var(--font-primary)'}}>{name}</span>
      {status && (
        <span style={{
          fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px',
          backgroundColor: 'var(--color-surface)', color: getStatusColor(),
          border: `1px solid ${getStatusColor()}`, opacity: 0.8
        }}>
          {status.toUpperCase()}
        </span>
      )}
    </motion.div>
  )
}

const MockCommitBadge = ({ hash, msg, layoutId }) => (
  <motion.div 
    layout 
    layoutId={layoutId}
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={springTransition}
    style={{
      display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px',
      backgroundColor: 'var(--color-darker)', border: '1px solid var(--color-border)',
      borderRadius: '6px', marginBottom: '8px', color: 'var(--color-text-primary)'
    }}
  >
    <div style={{
      width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-primary)',
      boxShadow: '0 0 0 2px var(--color-surface)'
    }} />
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)' }}>{hash}</span>
      <span style={{ fontSize: '0.85rem' }}>{msg}</span>
    </div>
  </motion.div>
)

const MockBranchLine = ({ name, isActive, layoutId }) => (
  <motion.div 
    layout 
    layoutId={layoutId}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={springTransition}
    style={{
      display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px',
      backgroundColor: isActive ? 'var(--color-primary-subtle)' : 'var(--color-darker)',
      border: `1px solid ${isActive ? 'var(--color-primary-light)' : 'var(--color-border)'}`,
      borderRadius: '6px', marginBottom: '8px', color: 'var(--color-text-primary)'
    }}
  >
    <span style={{color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)'}}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="6" y1="3" x2="6" y2="15"></line>
        <circle cx="18" cy="6" r="3"></circle>
        <circle cx="6" cy="18" r="3"></circle>
        <path d="M18 9a9 9 0 0 1-9 9"></path>
      </svg>
    </span>
    <span style={{flex: 1, fontSize: '0.85rem', fontWeight: isActive ? 600 : 400}}>{name}</span>
    {isActive && (
      <span style={{
        fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px',
        backgroundColor: 'var(--color-primary)', color: 'var(--color-text-on-primary)'
      }}>
        HEAD
      </span>
    )}
  </motion.div>
)

const MockTerminalOutput = ({ lines }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    style={{
      backgroundColor: '#1E1E1E', color: '#D4D4D4',
      fontFamily: 'Consolas, monospace', fontSize: '0.8rem',
      padding: '12px', borderRadius: '6px',
      whiteSpace: 'pre-wrap', textAlign: 'left',
      minHeight: '120px', overflowX: 'auto',
      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
      border: '1px solid #000'
    }}
  >
    {lines.map((l, i) => <div key={i} style={{color: l.color || '#D4D4D4', marginBottom: '4px'}}>{l.text}</div>)}
  </motion.div>
)

const EmptyState = ({ text }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{opacity: 0.6}}
  >
    <p style={{textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '32px'}}>
      {text}
    </p>
  </motion.div>
)

const GitBranchIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{opacity: 0.6}}>
    <line x1="6" y1="3" x2="6" y2="15"></line>
    <circle cx="18" cy="6" r="3"></circle>
    <circle cx="6" cy="18" r="3"></circle>
    <path d="M18 9a9 9 0 0 1-9 9"></path>
  </svg>
)

// --- Ana Bileşen ---
function PlaygroundArea({ activeCommand }) {
  const [step, setStep] = useState(0); 
  const [isAnimating, setIsAnimating] = useState(false);

  // activeCommand değiştiğinde sıfırlama işlemi DOM mount seviyesinde halledilecek (key)
  // Bu yüzden ekstra useEffect ile sıfırlamaya gerek kalmadı, yine de güvenliği sağlayalım.
  useEffect(() => {
    setStep(0);
    setIsAnimating(false);
  }, [activeCommand]);

  const handleExecute = () => {
    if (isAnimating) return;
    if (step === 1) {
      setStep(0);
      return;
    }

    setIsAnimating(true);
    setTimeout(() => {
      setStep(1);
      setIsAnimating(false);
    }, 600);
  }

  const getMockState = () => {
    switch(activeCommand) {
      case 'git-init':
        return {
          leftTitle: "Klasör (Local)", leftVariant: "local",
          leftContent: (
            <AnimatePresence mode="popLayout">
              <MockFileItem key="ini1" layoutId="f-root" name="project_root/" status={null} />
              <MockFileItem key="ini2" layoutId="f-pkg" name="package.json" status="untracked" />
            </AnimatePresence>
          ),
          rightTitle: "Git Deposu", rightVariant: "local",
          rightContent: (
            <AnimatePresence mode="popLayout">
              {step === 0 
                ? <EmptyState key="e-ini" text=".git klasörü bekleniyor." /> 
                : <MockFileItem key="ini3" layoutId="f-git" name=".git/ (Gizli Klasör)" status="staged" />
              }
            </AnimatePresence>
          ),
          actionText: step === 0 ? "Depoyu Başlat" : "Geri Dön",
          arrowDir: "➔"
        };

      case 'git-add':
        return {
          leftTitle: "Çalışma Dizini", leftVariant: "local",
          leftContent: (
            <AnimatePresence mode="popLayout">
              {step === 0 && <MockFileItem key="add1" layoutId="add-auth" name="src/utils/auth.js" status="modified" />}
              <MockFileItem key="add2" layoutId="add-app" name="src/App.jsx" status="untracked" />
            </AnimatePresence>
          ),
          rightTitle: "Hazırlık Alanı", rightVariant: "staging",
          rightContent: (
            <AnimatePresence mode="popLayout">
              {step === 0 
                ? <EmptyState key="add-e" text='Dosyaları hazırlık alanına taşıyın.' /> 
                : <MockFileItem key="add1" layoutId="add-auth" name="src/utils/auth.js" status="staged" />
              }
            </AnimatePresence>
          ),
          actionText: step === 0 ? "Hazırlığa Ekle" : "Geri Al",
          arrowDir: "➔"
        };

      case 'git-commit':
        return {
          leftTitle: "Hazırlık Alanı", leftVariant: "staging",
          leftContent: (
            <AnimatePresence mode="popLayout">
              {step === 0 && (
                <>
                  <MockFileItem key="com-f1" layoutId="com-f1" name="src/utils/auth.js" status="staged" />
                  <MockFileItem key="com-f2" layoutId="com-f2" name="src/App.jsx" status="staged" />
                </>
              )}
              {step === 1 && <EmptyState key="com-e" text='Dosyalar kayıt olarak saklandı.' />}
            </AnimatePresence>
          ),
          rightTitle: "Yerel Kayıtlar", rightVariant: "local",
          rightContent: (
            <AnimatePresence mode="popLayout">
              {step === 1 && <MockCommitBadge key="com-b1" layoutId="com-b1" hash="b8x5p1a" msg="added JWT auth" />}
              <MockCommitBadge key="com-b0" layoutId="com-b0" hash="a1b2c3d" msg="Initial setup" />
            </AnimatePresence>
          ),
          actionText: step === 0 ? "Kaydet" : "Geri Al",
          arrowDir: "➔"
        };

      case 'git-push':
        return {
          leftTitle: "Yerel Depo", leftVariant: "local",
          leftContent: (
            <AnimatePresence mode="popLayout">
               {/* push: yereldeki durur, uzağa "kopya" gider. Ama framer layoutId aynı olursa uçarak gider. O yüzden sağ ile solun id'leri farklı yapılır ki uçmasın veya clone animasyonu olsun. 
               Fakat basitlik adına yerelde sürekli kalsın. ID farklı olsun ki sadece sağda fade-in olsun. */}
              <MockCommitBadge key="psh-1" layoutId="psh-1-L" hash="7f8a9bc" msg="fix auth bugs" />
              <MockCommitBadge key="psh-2" layoutId="psh-2-L" hash="b8x5p1a" msg="added JWT auth" />
            </AnimatePresence>
          ),
          rightTitle: "GitHub (Remote)", rightVariant: "remote",
          rightContent: (
            <AnimatePresence mode="popLayout">
              {step === 1 && <MockCommitBadge key="psh-1R" layoutId="psh-1-R" hash="7f8a9bc" msg="fix auth bugs" />}
              <MockCommitBadge key="psh-2R" layoutId="psh-2-R" hash="b8x5p1a" msg="added JWT auth" />
              {step === 0 && <EmptyState key="psh-e" text="Uzak depo henüz 1 kayıt geride." />}
            </AnimatePresence>
          ),
          actionText: step === 0 ? "Gönder" : "Geri Al",
          arrowDir: "➔"
        };

      case 'git-pull':
        return {
          leftTitle: "Yerel Depo", leftVariant: "local",
          leftContent: (
             <AnimatePresence mode="popLayout">
              {step === 1 && <MockCommitBadge key="pll-1L" layoutId="pll-1-L" hash="9d3f1a2" msg="navbar styling applied" />}
              <MockCommitBadge key="pll-2L" layoutId="pll-2-L" hash="7f8a9bc" msg="fix auth bugs" />
              {step === 0 && <EmptyState key="pll-e" text="Uzak depoda yeni kayıtlar var." />}
            </AnimatePresence>
          ),
          rightTitle: "GitHub (Remote)", rightVariant: "remote",
          rightContent: (
             <AnimatePresence mode="popLayout">
              {/* Remote'ta kod hep sabittir */}
              <MockCommitBadge key="pll-1R" layoutId="pll-1-R" hash="9d3f1a2" msg="navbar styling applied" />
              <MockCommitBadge key="pll-2R" layoutId="pll-2-R" hash="7f8a9bc" msg="fix auth bugs" />
            </AnimatePresence>
          ),
          actionText: step === 0 ? "Çek" : "Geri Dön",
          arrowDir: "⬅"
        };
        
      case 'git-clone':
        return {
          leftTitle: "Yerel Dizin", leftVariant: "local",
          leftContent: (
            <AnimatePresence mode="popLayout">
              {step === 0 ? <EmptyState key="cln-e" text="Proje klasörü boş." /> : (
                <>
                  <MockFileItem key="cl-f1" layoutId="cl-f1-L" name="src/" status={null} />
                  <MockFileItem key="cl-f2" layoutId="cl-f2-L" name="package.json" status={null} />
                </>
              )}
            </AnimatePresence>
          ),
          rightTitle: "Uzak Depo", rightVariant: "remote",
          rightContent: (
            <AnimatePresence mode="popLayout">
              <MockFileItem key="cr-f1" layoutId="cr-f1-R" name="src/" status={null} />
              <MockFileItem key="cr-f2" layoutId="cr-f2-R" name="package.json" status={null} />
            </AnimatePresence>
          ),
          actionText: step === 0 ? "İndir" : "Sil",
          arrowDir: "⬅"
        };
        
      case 'git-branch':
        return {
          leftTitle: "Mevcut Sistem", leftVariant: "local",
          leftContent: (
            <AnimatePresence mode="popLayout">
              <MockBranchLine key="br1" layoutId="br-main-L" name="main" isActive={step === 0} />
              {step === 1 && <MockBranchLine key="br2" layoutId="br-feat-L" name="feature/payment" isActive={true} />}
            </AnimatePresence>
          ),
          rightTitle: "Kayıtlı Dallar", rightVariant: "local",
          rightContent: (
             <AnimatePresence mode="popLayout">
              <MockBranchLine key="br1r" layoutId="br-main-R" name="main" isActive={false} />
              {step === 1 && <MockBranchLine key="br2r" layoutId="br-feat-R" name="feature/payment" isActive={true} />}
              {step === 0 && <EmptyState key="br-e" text="Mevcut tek dal: main" />}
            </AnimatePresence>
          ),
          actionText: step === 0 ? "Dal Oluştur" : "Geri Dön",
          arrowDir: <GitBranchIcon />
        };

      case 'git-merge':
        return {
          leftTitle: "Dal: feature/payment", leftVariant: "local",
          leftContent: (
             <AnimatePresence mode="popLayout">
              {step === 0 && <MockCommitBadge key="mr-1" layoutId="mr-1" hash="d2g4x1" msg="stripe api integration" />}
            </AnimatePresence>
          ),
          rightTitle: "Hedef Dal: main", rightVariant: "local",
          rightContent: (
            <AnimatePresence mode="popLayout">
              {step === 1 && <MockCommitBadge key="mr-1" layoutId="mr-1" hash="d2g4x1" msg="stripe api integration" />}
              <MockCommitBadge key="mr-2" layoutId="mr-2" hash="7f8a9bc" msg="fix auth bugs" />
            </AnimatePresence>
          ),
          actionText: step === 0 ? "Birleştir" : "Geri Al",
          arrowDir: "➔"
        };

      case 'git-status':
        return {
          leftTitle: "Çalışma Dizini", leftVariant: "local",
          leftContent: (
            <>
              <MockFileItem key="st-1" layoutId="st-add-1" name="src/components/Header.jsx" status="modified" />
              <MockFileItem key="st-2" layoutId="st-add-2" name="assets/logo.svg" status="untracked" />
            </>
          ),
          rightTitle: "Terminal Çıktısı", rightVariant: "local",
          rightContent: (
             step === 0 ? <EmptyState text="Sorgu çalıştırılmadı." /> : 
             <MockTerminalOutput lines={[
               {text: "On branch main"},
               {text: "Changes not staged for commit:"},
               {text: "  modified:   src/components/Header.jsx", color: "#F48771"},
               {text: "Untracked files:"},
               {text: "  assets/logo.svg", color: "#F48771"}
             ]} />
          ),
          actionText: step === 0 ? "Sorgula" : "Sıfırla",
          arrowDir: "➔"
        };

      case 'git-log':
        return {
          leftTitle: "Kayıt Geçmişi", leftVariant: "local",
          leftContent: (
            <>
              <MockCommitBadge key="lg-1" layoutId="lg-1" hash="c9b8a7f" msg="footer links updated" />
              <MockCommitBadge key="lg-2" layoutId="lg-2" hash="b8x5p1a" msg="added JWT auth" />
            </>
          ),
          rightTitle: "Terminal Çıktısı", rightVariant: "local",
          rightContent: (
             step === 0 ? <EmptyState text="Sorgu çalıştırılmadı." /> : 
             <MockTerminalOutput lines={[
               {text: "commit c9b8a7f (HEAD -> main)", color: "#E0B737"},
               {text: "Author: Developer <dev@mail.com>"},
               {text: "    footer links updated"},
               {text: "\ncommit b8x5p1a", color: "#E0B737"},
               {text: "Author: Developer <dev@mail.com>"},
               {text: "    added JWT auth"}
             ]} />
          ),
          actionText: step === 0 ? "Görüntüle" : "Sıfırla",
          arrowDir: "➔"
        };

      case 'git-diff':
        return {
          leftTitle: "Dosyalar", leftVariant: "local",
          leftContent: <MockFileItem key="df-1" layoutId="df-1" name="src/utils/math.js" status="modified" />,
          rightTitle: "Terminal Çıktısı", rightVariant: "local",
          rightContent: (
             step === 0 ? <EmptyState text="Sorgu çalıştırılmadı." /> : 
             <MockTerminalOutput lines={[
               {text: "diff --git a/src/utils/math.js b/math.js"},
               {text: "--- a/src/utils/math.js", color: "white"},
               {text: "+++ b/src/utils/math.js", color: "white"},
               {text: "- const calculate = (a, b) => a + b;", color: "#F48771"},
               {text: "+ const calculate = (a, b) => {", color: "#7EE787"},
               {text: "+   return a + b;", color: "#7EE787"},
               {text: "+ }", color: "#7EE787"}
             ]} />
          ),
          actionText: step === 0 ? "Karşılaştır" : "Sıfırla",
          arrowDir: "➔"
        };

      case 'git-stash':
        return {
          leftTitle: "Çalışma Dizini", leftVariant: "local",
          leftContent: (
            <AnimatePresence mode="popLayout">
              {step === 0 && <MockFileItem key="sh-1" layoutId="sh-1" name="src/config/db.js" status="modified" />}
              <MockFileItem key="sh-2" layoutId="sh-2" name="src/App.jsx" status={null} />
            </AnimatePresence>
          ),
          rightTitle: "Stash Kutusu", rightVariant: "stash",
          rightContent: (
            <AnimatePresence mode="popLayout">
              {step === 0 ? <EmptyState key="sh-e" text="Saklama alanı boş." /> : <MockFileItem key="sh-1" layoutId="sh-1" name="src/config/db.js" status="modified" />}
            </AnimatePresence>
          ),
          actionText: step === 0 ? "Sakla" : "Geri Yükle",
          arrowDir: "➔"
        };

      case 'git-checkout':
        return {
          leftTitle: "Yerel Dizin", leftVariant: "local",
          leftContent: (
             <AnimatePresence mode="popLayout">
               {step === 0 ? <MockFileItem key="ck-1" layoutId="ck-1" name="src/components/List.jsx" status={null} /> : <MockFileItem key="ck-2" layoutId="ck-2" name="src/components/Search.jsx" status={null} /> }
             </AnimatePresence>
          ),
          rightTitle: "Aktif Dal", rightVariant: "local",
          rightContent: (
             <AnimatePresence mode="popLayout">
              <MockBranchLine key="ck-b1" layoutId="ck-b1" name="main" isActive={step === 0} />
              <MockBranchLine key="ck-b2" layoutId="ck-b2" name="feature/search" isActive={step === 1} />
            </AnimatePresence>
          ),
          actionText: step === 0 ? "Geçiş Yap" : "Geri Dön",
          arrowDir: "➔"
        };

      case 'git-config':
        return {
          leftTitle: "Yapılandırma", leftVariant: "local",
          leftContent: (
            <AnimatePresence mode="popLayout">
              {step === 0 
                ? <EmptyState key="cfg-e" text="Kullanıcı bilgileri henüz ayarlanmadı." />
                : (
                  <>
                    <MockFileItem key="cfg-1" layoutId="cfg-1" name="user.name = Elif" status="staged" />
                    <MockFileItem key="cfg-2" layoutId="cfg-2" name="user.email = elif@mail.com" status="staged" />
                  </>
                )
              }
            </AnimatePresence>
          ),
          rightTitle: "Yapılandırma Dosyası", rightVariant: "local",
          rightContent: (
             step === 0 ? <EmptyState text="Ayarlar bekleniyor." /> : 
             <MockTerminalOutput lines={[
               {text: "[user]"},
               {text: "  name = Elif", color: "#7EE787"},
               {text: "  email = elif@mail.com", color: "#7EE787"},
               {text: "[core]"},
               {text: "  editor = code --wait"}
             ]} />
          ),
          actionText: step === 0 ? "Yapılandır" : "Sıfırla",
          arrowDir: "➔"
        };

      case 'git-reset':
        return {
          leftTitle: "Yerel Kayıtlar", leftVariant: "local",
          leftContent: (
            <AnimatePresence mode="popLayout">
              {step === 0 && <MockCommitBadge key="rst-1" layoutId="rst-1" hash="d7e9c4f" msg="feat: navbar eklendi" />}
              <MockCommitBadge key="rst-2" layoutId="rst-2" hash="a3f1b2c" msg="feat: sayfa yapısı" />
            </AnimatePresence>
          ),
          rightTitle: "Çalışma Dizini", rightVariant: "local",
          rightContent: (
            <AnimatePresence mode="popLayout">
              {step === 0
                ? <EmptyState key="rst-e" text="Kayıt geri alınmadı." />
                : <MockFileItem key="rst-f1" layoutId="rst-f1" name="src/components/Navbar.jsx" status="modified" />
              }
            </AnimatePresence>
          ),
          actionText: step === 0 ? "Geri Al" : "Sıfırla",
          arrowDir: "⬅"
        };

      case 'git-rebase':
        return {
          leftTitle: "Dal: feature", leftVariant: "local",
          leftContent: (
            <AnimatePresence mode="popLayout">
              <MockCommitBadge key="rb-1" layoutId="rb-1" hash="e5f6a7b" msg="feat: arama eklendi" />
              {step === 0 && <MockCommitBadge key="rb-old" layoutId="rb-old" hash="c3d4e5f" msg="eski temel kayıt" />}
            </AnimatePresence>
          ),
          rightTitle: "Hedef: main", rightVariant: "local",
          rightContent: (
            <AnimatePresence mode="popLayout">
              <MockCommitBadge key="rb-m1" layoutId="rb-m1" hash="a1b2c3d" msg="son stabil kayıt" />
              {step === 1 && <MockCommitBadge key="rb-1r" layoutId="rb-1-r" hash="e5f6a7b" msg="feat: arama eklendi" />}
            </AnimatePresence>
          ),
          actionText: step === 0 ? "Temellendir" : "Geri Dön",
          arrowDir: "➔"
        };

      case 'git-cherry-pick':
        return {
          leftTitle: "Kaynak Dal", leftVariant: "local",
          leftContent: (
            <AnimatePresence mode="popLayout">
              <MockCommitBadge key="cp-1" layoutId="cp-1-L" hash="d7e9c4f" msg="feat: navbar eklendi" />
              <MockCommitBadge key="cp-2" layoutId="cp-2-L" hash="b8x5p1a" msg="fix: typo düzeltme" />
            </AnimatePresence>
          ),
          rightTitle: "Hedef Dal: main", rightVariant: "local",
          rightContent: (
            <AnimatePresence mode="popLayout">
              {step === 1 && <MockCommitBadge key="cp-1r" layoutId="cp-1-R" hash="f1a2b3c" msg="feat: navbar eklendi" />}
              <MockCommitBadge key="cp-3" layoutId="cp-3" hash="a1b2c3d" msg="son stabil kayıt" />
              {step === 0 && <EmptyState key="cp-e" text="Seçilen kayıt henüz uygulanmadı." />}
            </AnimatePresence>
          ),
          actionText: step === 0 ? "Uygula" : "Geri Al",
          arrowDir: "➔"
        };

      default:
        return {
          leftTitle: "Bulunamadı", leftVariant: "local",
          leftContent: <EmptyState key="du1" text="-" />,
          rightTitle: "Hazır değil", rightVariant: "local",
          rightContent: <EmptyState key="du2" text="-" />,
          actionText: "Geçersiz",
          arrowDir: "➔"
        };
    }
  }

  const { leftTitle, leftVariant, leftContent, rightTitle, rightVariant, rightContent, actionText, arrowDir } = getMockState();

  return (
    // 'key={activeCommand}' eklentisi React'e her komutta bileşeni sıfırlamasını (unmount/remount) söyler.
    // Bu sayede komutlar arası geçişte animasyon state'leri "alıklaşmaz" ve temiz bir sayfa açılır.
    <div className={styles.playground} key={activeCommand}>
      <div className={styles.monitorsContainer}>
        {/* Sol Monitör */}
        <div className={styles.monitorSlot}>
          <MonitorFrame title={leftTitle} variant={leftVariant}>
            {leftContent}
          </MonitorFrame>
        </div>

        {/* Ok / Yön İkonu Animasyonu */}
        <div className={styles.actionArea}>
          <motion.div 
             key={typeof arrowDir === 'string' ? arrowDir : 'icon'}
             initial={{ scale: 0.5, opacity: 0 }}
             animate={{ scale: 1, opacity: step === 1 ? 1 : 0.6 }}
             transition={{ type: "spring" }}
             className={styles.arrowIcon}
          >
            {arrowDir}
          </motion.div>
        </div>

        {/* Sağ Monitör */}
        <div className={styles.monitorSlot}>
          <MonitorFrame title={rightTitle} variant={rightVariant}>
            {rightContent}
          </MonitorFrame>
        </div>
      </div>

      <div className={styles.footerControls}>
        <motion.button 
           whileHover={{ scale: isAnimating ? 1 : 1.05 }}
           whileTap={{ scale: isAnimating ? 1 : 0.95 }}
           className={styles.executeButton} 
           onClick={handleExecute}
           disabled={isAnimating}
           style={{ opacity: isAnimating ? 0.7 : 1, cursor: isAnimating ? 'not-allowed' : 'pointer' }}
        >
          {isAnimating ? "İşleniyor..." : actionText}
        </motion.button>
      </div>
    </div>
  )
}

export default PlaygroundArea
