/**
 * mergeMind - Git Komut Verileri
 * Her komut için kullanım örnekleri ve açıklama metinleri.
 */

const gitCommandsData = {
  'git-init': {
    id: 'git-init',
    name: 'git init',
    category: 'Başlatma',
    syntax: {
      title: 'git init',
      usage: [
        { command: 'git init', description: 'Mevcut dizinde yeni bir Git deposu oluşturur.' },
        { command: 'git init <dizin>', description: 'Belirtilen adla yeni bir klasör oluşturur ve içinde depo başlatır.' },
        { command: 'git init --bare', description: 'Çalışma dizini olmayan sunucu tarafı depo oluşturur.' },
        { command: 'git init --initial-branch=main', description: 'Başlangıç dalını belirtilen adla oluşturur.' },
      ],
      terminalExample: [],
    },
    explanation: {
      title: 'git init Nedir?',
      paragraphs: [
        '`git init` komutu, bir dizinde yeni bir Git deposu başlatır. Çalıştırıldığında dizine gizli bir `.git` klasörü eklenir. Bu klasör, projenin versiyon geçmişini ve yapılandırmasını barındırır.',
        'Mevcut dosyaları etkilemez, var olan bir projede güvenle çalıştırılabilir. `--bare` seçeneği ile çalışma dizini olmayan sunucu tarafı depolar oluşturulabilir.',
      ],
      tips: [
        'Başlattıktan sonra `git status` ile depo durumunu doğrulayın.',
        'Yanlışlıkla başlattıysanız `.git` klasörünü silerek geri alabilirsiniz.',
      ],
      warnings: [
        '`.git` klasörünü silmek tüm geçmişi kalıcı olarak yok eder.',
        'Alt dizinlerde tekrar çalıştırmaktan kaçının.',
      ],
    },
  },

  'git-config': {
    id: 'git-config',
    name: 'git config',
    category: 'Başlatma',
    syntax: {
      title: 'git config',
      usage: [
        { command: 'git config --global user.name "<ad>"', description: 'Tüm depolar için kullanıcı adını ayarlar.' },
        { command: 'git config --global user.email "<e-posta>"', description: 'Tüm depolar için e-posta adresini ayarlar.' },
        { command: 'git config --list', description: 'Geçerli yapılandırma ayarlarını listeler.' },
        { command: 'git config user.name', description: 'Belirli bir ayarın değerini gösterir.' },
        { command: 'git config --global core.editor "code --wait"', description: 'Varsayılan metin düzenleyiciyi belirler.' },
      ],
      terminalExample: [],
    },
    explanation: {
      title: 'git config Nedir?',
      paragraphs: [
        '`git config` komutu, Git\'in davranışını ve kullanıcı bilgilerini yapılandırır. Kayıtlarda görünecek ad ve e-posta adresi bu komutla belirlenir. `--global` seçeneği ayarı tüm depolar için geçerli kılar.',
        '`--local` seçeneği yalnızca mevcut depoyu etkiler ve global ayarları geçersiz kılar. Yapılandırma dosyaları `~/.gitconfig` (global) ve `.git/config` (yerel) konumlarında saklanır.',
      ],
      tips: [
        '`git config --list --show-origin` ile her ayarın hangi dosyadan geldiğini görün.',
        'İlk kurulumda `user.name` ve `user.email` mutlaka ayarlanmalıdır.',
      ],
      warnings: [
        'E-posta adresi kayıt geçmişinde herkese açık görünür. Gizlilik için GitHub noreply adresi kullanılabilir.',
        '`--global` ile yapılan değişiklikler tüm projeleri etkiler.',
      ],
    },
  },

  'git-add': {
    id: 'git-add',
    name: 'git add',
    category: 'Temel',
    syntax: {
      title: 'git add',
      usage: [
        { command: 'git add <dosya>', description: 'Belirtilen dosyayı hazırlık alanına ekler.' },
        { command: 'git add .', description: 'Mevcut dizindeki tüm değişiklikleri ekler.' },
        { command: 'git add -A', description: 'Deponun tamamındaki tüm değişiklikleri ekler.' },
        { command: 'git add -u', description: 'Yalnızca izlenen dosyalardaki değişiklikleri ekler.' },
        { command: 'git add -p', description: 'Değişiklikleri parça parça inceleyerek seçici şekilde ekler.' },
      ],
      terminalExample: [],
    },
    explanation: {
      title: 'git add Nedir?',
      paragraphs: [
        '`git add` komutu, dosyalardaki değişiklikleri hazırlık alanına taşır. Hazırlık alanı, bir sonraki `git commit` ile kaydedilecek değişikliklerin toplandığı ara bölgedir.',
        '`git add .` yalnızca mevcut dizindeki değişiklikleri eklerken, `git add -A` silinmiş dosyalar dahil tüm depoyu kapsar.',
      ],
      tips: [
        'Hazırlık alanından çıkarmak için `git restore --staged <dosya>` kullanılır.',
        'Eklemeden önce `git status` ile durumu kontrol edin.',
      ],
      warnings: [
        '`.gitignore` dışındaki tüm dosyalar eklenir. Hassas verilere dikkat edin.',
        'Büyük ikili dosyaları yanlışlıkla eklemek depo boyutunu gereksiz artırır.',
      ],
    },
  },

  'git-commit': {
    id: 'git-commit',
    name: 'git commit',
    category: 'Temel',
    syntax: {
      title: 'git commit',
      usage: [
        { command: 'git commit -m "mesaj"', description: 'Hazırlık alanındaki değişiklikleri belirtilen mesajla kaydeder.' },
        { command: 'git commit -a -m "mesaj"', description: 'İzlenen dosyalardaki değişiklikleri otomatik ekleyip kaydeder.' },
        { command: 'git commit --amend', description: 'Son kaydı düzenler.' },
        { command: 'git commit --amend --no-edit', description: 'Son kayda dosya ekler, mesajı değiştirmez.' },
      ],
      terminalExample: [],
    },
    explanation: {
      title: 'git commit Nedir?',
      paragraphs: [
        '`git commit` komutu, hazırlık alanındaki değişiklikleri yerel depoya kalıcı olarak kaydeder. Her kayıt, projenin o anki durumunu yansıtan benzersiz bir kimlikle tanımlanır.',
        'Kayıt mesajı kısa ve açıklayıcı olmalıdır. `--amend` ile son kayıt düzenlenebilir ancak yalnızca henüz paylaşılmamış kayıtlarda kullanılmalıdır.',
      ],
      tips: [
        'Sık ve küçük kayıtlar yapmak hata bulmayı kolaylaştırır.',
        'Mesajlarda "feat:", "fix:" gibi ön ekler okunabilirliği artırır.',
      ],
      warnings: [
        '`--amend` kullanılan kayıtların kimliği değişir. Paylaşılmış kayıtlarda kullanmayın.',
        'Hazırlık alanı boşken çalıştırıldığında hata verir.',
      ],
    },
  },

  'git-push': {
    id: 'git-push',
    name: 'git push',
    category: 'Paylaşım',
    syntax: {
      title: 'git push',
      usage: [
        { command: 'git push origin main', description: 'Yerel kayıtları uzak depoya gönderir.' },
        { command: 'git push -u origin main', description: 'Gönderir ve takip bağlantısı kurar.' },
        { command: 'git push --all', description: 'Tüm yerel dalları uzak depoya gönderir.' },
        { command: 'git push --tags', description: 'Tüm etiketleri uzak depoya gönderir.' },
        { command: 'git push origin --delete <dal>', description: 'Uzak depodaki belirtilen dalı siler.' },
      ],
      terminalExample: [],
    },
    explanation: {
      title: 'git push Nedir?',
      paragraphs: [
        '`git push` komutu, yerel depodaki kayıtları uzak depoya gönderir. Yalnızca kaydedilmiş değişiklikler aktarılır; hazırlık alanındaki veya kaydedilmemiş değişiklikler gönderilmez.',
        'İlk gönderimde `-u` seçeneği ile takip bağlantısı kurulur. Bu sayede sonraki işlemlerde dal adı belirtmek gerekmez.',
      ],
      tips: [
        'İlk gönderimde `-u` ile takip bağlantısı kurun.',
        'Göndermeden önce `git log origin/main..main` ile nelerin gideceğini görün.',
      ],
      warnings: [
        '`--force` seçeneğini paylaşılan dallarda kullanmayın.',
        'Gönderim geri alınamaz, dikkatli olun.',
      ],
    },
  },

  'git-pull': {
    id: 'git-pull',
    name: 'git pull',
    category: 'Paylaşım',
    syntax: {
      title: 'git pull',
      usage: [
        { command: 'git pull', description: 'Takip edilen uzak daldan değişiklikleri çekip birleştirir.' },
        { command: 'git pull origin main', description: 'Belirtilen uzak daldan değişiklikleri çeker.' },
        { command: 'git pull --rebase', description: 'Birleştirme yerine yeniden temellendirme yapar.' },
        { command: 'git pull --ff-only', description: 'Yalnızca doğrudan ileri sarım mümkünse birleştirir.' },
      ],
      terminalExample: [],
    },
    explanation: {
      title: 'git pull Nedir?',
      paragraphs: [
        '`git pull` komutu, uzak depodaki değişiklikleri yerel depoya çekip mevcut dala birleştirir. Arka planda `git fetch` ve `git merge` işlemlerini sırayla çalıştırır.',
        '`--rebase` seçeneği daha düzenli bir geçmiş sağlar. Çekmeden önce çalışma dizininin temiz olduğundan emin olunmalıdır.',
      ],
      tips: [
        'Öncesinde `git fetch` ile gelecek değişiklikleri inceleyin.',
        'Daha temiz geçmiş için `--rebase` tercih edilebilir.',
      ],
      warnings: [
        'Kaydedilmemiş değişikliklerle çekmek çakışmalara neden olabilir.',
        'Yeniden temellendirme modunda çakışma çözümü için `git rebase --continue` kullanılır.',
      ],
    },
  },

  'git-clone': {
    id: 'git-clone',
    name: 'git clone',
    category: 'Paylaşım',
    syntax: {
      title: 'git clone',
      usage: [
        { command: 'git clone <url>', description: 'Uzak depoyu yerel makineye kopyalar.' },
        { command: 'git clone <url> <klasör>', description: 'Belirtilen klasör adıyla kopyalar.' },
        { command: 'git clone -b <dal> <url>', description: 'Yalnızca belirtilen dalı kopyalar.' },
        { command: 'git clone --depth 1 <url>', description: 'Yalnızca son kaydı içeren hafif bir kopya oluşturur.' },
      ],
      terminalExample: [],
    },
    explanation: {
      title: 'git clone Nedir?',
      paragraphs: [
        '`git clone` komutu, uzak bir deponun tam kopyasını yerel makineye indirir. Tüm dosyalar, kayıt geçmişi ve dallar bu kopyaya dahildir. Kaynak depo otomatik olarak "origin" adıyla kaydedilir.',
        '`--depth 1` seçeneği yalnızca son kaydı indirerek zaman ve alan tasarrufu sağlar. Büyük projelerde veya yalnızca kodu incelemek istenen durumlarda kullanışlıdır.',
      ],
      tips: [
        'Kopyaladıktan sonra `git remote -v` ile bağlantıyı doğrulayın.',
        'Büyük depolar için `--depth 1 --single-branch` kullanılabilir.',
      ],
      warnings: [
        'Sığ kopyalarda tam geçmişe erişilemez. `git fetch --unshallow` ile tamamlanabilir.',
        'Özel depolar için kimlik doğrulama gerekir.',
      ],
    },
  },

  'git-branch': {
    id: 'git-branch',
    name: 'git branch',
    category: 'Dallanma',
    syntax: {
      title: 'git branch',
      usage: [
        { command: 'git branch', description: 'Yerel dalları listeler. Aktif dal * ile gösterilir.' },
        { command: 'git branch <ad>', description: 'Belirtilen adda yeni bir dal oluşturur.' },
        { command: 'git branch -a', description: 'Yerel ve uzak tüm dalları listeler.' },
        { command: 'git branch -d <ad>', description: 'Birleştirilmiş dalı güvenli şekilde siler.' },
        { command: 'git branch -D <ad>', description: 'Dalı birleştirilmemiş olsa bile siler.' },
        { command: 'git branch -m <eski> <yeni>', description: 'Dalın adını değiştirir.' },
      ],
      terminalExample: [],
    },
    explanation: {
      title: 'git branch Nedir?',
      paragraphs: [
        '`git branch` komutu, dalları listelemek, oluşturmak ve silmek için kullanılır. Dallar, ana kod tabanından bağımsız geliştirme hatları oluşturmayı sağlar.',
        'Yeni dal oluşturmak o dala geçiş yapmaz. Geçiş için `git checkout` veya `git switch` kullanılır. Git\'te dal oluşturmak anlık bir işlemdir çünkü dallar kayda işaret eden hafif referanslardır.',
      ],
      tips: [
        'Dal adlarında `feature/`, `bugfix/` gibi ön ekler düzeni artırır.',
        '`git branch -vv` ile dalların takip bilgilerini görüntüleyin.',
      ],
      warnings: [
        '`-D` seçeneği birleştirilmemiş dalları bile siler.',
        'Uzak dalları silmek için `git push origin --delete <dal>` kullanılır.',
      ],
    },
  },

  'git-merge': {
    id: 'git-merge',
    name: 'git merge',
    category: 'Dallanma',
    syntax: {
      title: 'git merge',
      usage: [
        { command: 'git merge <dal>', description: 'Belirtilen dalı mevcut dala birleştirir.' },
        { command: 'git merge --no-ff <dal>', description: 'Doğrudan ileri sarım mümkün olsa bile birleştirme kaydı oluşturur.' },
        { command: 'git merge --squash <dal>', description: 'Tüm kayıtları tek bir kayıtta sıkıştırarak birleştirir.' },
        { command: 'git merge --abort', description: 'Devam eden birleştirmeyi iptal eder.' },
      ],
      terminalExample: [],
    },
    explanation: {
      title: 'git merge Nedir?',
      paragraphs: [
        '`git merge` komutu, iki dalın geliştirme geçmişini birleştirir. Genellikle bir özellik dalındaki çalışmayı ana dala aktarmak için kullanılır.',
        'Çakışma oluşursa Git dosyaları işaretler ve çözümü geliştiriciye bırakır. Düzeltme sonrası `git add` ve `git commit` ile birleştirme tamamlanır.',
      ],
      tips: [
        'Birleştirmeden önce `git diff main..feature` ile farkları inceleyin.',
        '`--no-ff` seçeneği dal geçmişinin korunmasını sağlar.',
      ],
      warnings: [
        'Uzun süre güncellenmemiş dallar karmaşık çakışmalara neden olabilir.',
        '`--abort` yalnızca birleştirme tamamlanmadan çalışır.',
      ],
    },
  },

  'git-status': {
    id: 'git-status',
    name: 'git status',
    category: 'Bilgi',
    syntax: {
      title: 'git status',
      usage: [
        { command: 'git status', description: 'Çalışma dizininin ve hazırlık alanının durumunu gösterir.' },
        { command: 'git status -s', description: 'Kısa biçimde durum çıktısı verir.' },
        { command: 'git status --ignored', description: 'Yok sayılan dosyaları da listeler.' },
        { command: 'git status -b', description: 'Dal bilgisini kısa biçimde gösterir.' },
      ],
      terminalExample: [],
    },
    explanation: {
      title: 'git status Nedir?',
      paragraphs: [
        '`git status` komutu, dosyaların mevcut durumunu gösterir. Hazırlık alanındaki, değiştirilen ve izlenmeyen dosyalar ayrı ayrı listelenir. Herhangi bir dosyayı değiştirmez.',
        'Dalın uzak depoya göre kaç kayıt ileride veya geride olduğunu da bildirir. Git ile çalışırken en sık kullanılan komutlardan biridir.',
      ],
      tips: [
        '`git status -sb` kısa biçim ve dal bilgisini tek satırda gösterir.',
        'Her kayıt öncesinde durum kontrolü yapmak iyi bir alışkanlıktır.',
      ],
      warnings: [
        'Yalnızca bilgi verir, dosyalarda değişiklik yapmaz.',
      ],
    },
  },

  'git-log': {
    id: 'git-log',
    name: 'git log',
    category: 'Bilgi',
    syntax: {
      title: 'git log',
      usage: [
        { command: 'git log', description: 'Kayıt geçmişini ayrıntılı gösterir.' },
        { command: 'git log --oneline', description: 'Her kaydı tek satırda özetler.' },
        { command: 'git log --graph', description: 'Dal yapısını görsel olarak çizer.' },
        { command: 'git log --oneline --graph --all', description: 'Tüm dalların görsel geçmişini gösterir.' },
        { command: 'git log -n <sayı>', description: 'Son N kaydı gösterir.' },
        { command: 'git log --author="<ad>"', description: 'Belirli bir yazarın kayıtlarını filtreler.' },
      ],
      terminalExample: [],
    },
    explanation: {
      title: 'git log Nedir?',
      paragraphs: [
        '`git log` komutu, deponun kayıt geçmişini en yeniden en eskiye doğru listeler. Her kayıt için kimlik, yazar, tarih ve mesaj gösterilir.',
        '`--oneline --graph` birleşimi en kullanışlı biçimdir; dal yapısını görsel olarak gösterir. Uzun çıktıdan çıkmak için `q` tuşuna basılır.',
      ],
      tips: [
        '`--oneline --graph --all` ile tüm dalların haritasını görüntüleyin.',
        '`--author="ad"` ile belirli bir yazarın kayıtlarını filtreleyin.',
      ],
      warnings: [
        'Yerel geçmişi gösterir. Güncel uzak geçmiş için önce `git fetch` çalıştırın.',
      ],
    },
  },

  'git-diff': {
    id: 'git-diff',
    name: 'git diff',
    category: 'Bilgi',
    syntax: {
      title: 'git diff',
      usage: [
        { command: 'git diff', description: 'Hazırlık alanına eklenmemiş değişiklikleri gösterir.' },
        { command: 'git diff --staged', description: 'Kaydedilmeyi bekleyen değişiklikleri gösterir.' },
        { command: 'git diff <dosya>', description: 'Belirli bir dosyadaki değişiklikleri gösterir.' },
        { command: 'git diff <dal1>..<dal2>', description: 'İki dal arasındaki farkları gösterir.' },
        { command: 'git diff --stat', description: 'Değişiklik özetini istatistik biçiminde verir.' },
      ],
      terminalExample: [],
    },
    explanation: {
      title: 'git diff Nedir?',
      paragraphs: [
        '`git diff` komutu, dosyalar arasındaki farkları satır satır gösterir. Eklenen satırlar `+`, silinen satırlar `-` ile işaretlenir. Kayıt yapmadan önce değişiklikleri gözden geçirmek için kullanılır.',
        'Parametresiz çalıştırıldığında hazırlık alanına eklenmemiş değişiklikleri gösterir. `--staged` seçeneği ise kayda dahil edilecek değişiklikleri listeler.',
      ],
      tips: [
        '`git diff HEAD` ile tüm değişiklikleri karşılaştırın.',
        '`git diff main..feature` ile iki dal arasındaki farkları inceleyin.',
      ],
      warnings: [
        'Yeni oluşturulmuş ve izlenmeyen dosyalar çıktıda görünmez.',
        'İkili dosyalarda fark gösterilemez.',
      ],
    },
  },

  'git-stash': {
    id: 'git-stash',
    name: 'git stash',
    category: 'Diğer',
    syntax: {
      title: 'git stash',
      usage: [
        { command: 'git stash', description: 'Değişiklikleri geçici olarak saklar.' },
        { command: 'git stash push -m "mesaj"', description: 'Açıklayıcı mesajla saklar.' },
        { command: 'git stash pop', description: 'Son saklananı geri yükler ve listeden çıkarır.' },
        { command: 'git stash apply', description: 'Son saklananı geri yükler, listede tutar.' },
        { command: 'git stash list', description: 'Saklanan değişiklikleri listeler.' },
        { command: 'git stash drop stash@{n}', description: 'Belirtilen kaydı listeden siler.' },
      ],
      terminalExample: [],
    },
    explanation: {
      title: 'git stash Nedir?',
      paragraphs: [
        '`git stash` komutu, henüz kaydedilmeye hazır olmayan değişiklikleri geçici olarak saklar. Çalışma dizini temizlenir ve dal değiştirme gibi işlemler güvenle yapılabilir.',
        '`pop` saklananı geri yükleyip listeden çıkarır, `apply` ise geri yükler ama listede tutar. Birden fazla saklama yapıldığında `push -m "mesaj"` ile açıklayıcı ad verilmesi önerilir.',
      ],
      tips: [
        '`git stash -u` ile izlenmeyen dosyalar da saklanır.',
        '`git stash show -p` ile içeriği yüklemeden inceleyebilirsiniz.',
      ],
      warnings: [
        'Geri yükleme sırasında çakışmalar oluşabilir.',
        '`git stash clear` tüm kayıtları geri dönüşümsüz siler.',
      ],
    },
  },

  'git-checkout': {
    id: 'git-checkout',
    name: 'git checkout',
    category: 'Navigasyon',
    syntax: {
      title: 'git checkout',
      usage: [
        { command: 'git checkout <dal>', description: 'Belirtilen dala geçiş yapar.' },
        { command: 'git checkout -b <ad>', description: 'Yeni dal oluşturur ve geçiş yapar.' },
        { command: 'git checkout -- <dosya>', description: 'Dosyadaki kaydedilmemiş değişiklikleri geri alır.' },
        { command: 'git checkout <kimlik>', description: 'Belirli bir kayda geçici olarak gider.' },
      ],
      terminalExample: [],
    },
    explanation: {
      title: 'git checkout Nedir?',
      paragraphs: [
        '`git checkout` komutu, dallar arasında geçiş yapmak ve dosyaları geri yüklemek için kullanılır. Bir dala geçildiğinde çalışma dizinindeki dosyalar o dalın son kaydına göre güncellenir.',
        '`-b` seçeneği ile dal oluşturma ve geçiş tek komutta yapılır. Git 2.23 sonrasında dal geçişi için `git switch`, dosya geri yükleme için `git restore` önerilir.',
      ],
      tips: [
        '`git checkout -` ile bir önceki dala hızlıca dönülür.',
        'Geçiş öncesinde kaydedilmemiş değişiklikleri saklamak gerekebilir.',
      ],
      warnings: [
        '`git checkout -- <dosya>` ile geri alınan değişiklikler kurtarılamaz.',
        'Bağımsız HEAD modunda yapılan kayıtlar dala atanmazsa kaybolabilir.',
      ],
    },
  },

  'git-reset': {
    id: 'git-reset',
    name: 'git reset',
    category: 'Geri Alma',
    syntax: {
      title: 'git reset',
      usage: [
        { command: 'git reset <dosya>', description: 'Dosyayı hazırlık alanından çıkarır, değişiklikler korunur.' },
        { command: 'git reset --soft HEAD~1', description: 'Son kaydı geri alır, değişiklikler hazırlık alanında kalır.' },
        { command: 'git reset --mixed HEAD~1', description: 'Son kaydı geri alır, değişiklikler çalışma dizininde kalır.' },
        { command: 'git reset --hard HEAD~1', description: 'Son kaydı ve tüm değişiklikleri kalıcı olarak siler.' },
        { command: 'git reset --hard origin/main', description: 'Yerel dalı uzak depoyla eşitler.' },
      ],
      terminalExample: [],
    },
    explanation: {
      title: 'git reset Nedir?',
      paragraphs: [
        '`git reset` komutu, kayıtları geri almak ve hazırlık alanını temizlemek için kullanılır. `--soft` değişiklikleri hazırlık alanında tutar, `--mixed` çalışma dizininde bırakır, `--hard` ise tamamen siler.',
        'Henüz paylaşılmamış yerel kayıtlarda güvenle kullanılabilir. Paylaşılmış kayıtlarda `git revert` tercih edilmelidir.',
      ],
      tips: [
        '`git reflog` ile reset sonrası kaybolan kayıtları bulabilirsiniz.',
        'Önce `--soft` veya `--mixed` ile deneyip sonucu kontrol edin.',
      ],
      warnings: [
        '`--hard` seçeneği değişiklikleri geri dönüşümsüz siler.',
        'Paylaşılmış dallarda kullanmak diğer geliştiricilerin çalışmasını bozar.',
      ],
    },
  },

  'git-rebase': {
    id: 'git-rebase',
    name: 'git rebase',
    category: 'Dallanma',
    syntax: {
      title: 'git rebase',
      usage: [
        { command: 'git rebase main', description: 'Mevcut dalı main üzerine yeniden temellendirir.' },
        { command: 'git rebase -i HEAD~3', description: 'Son 3 kaydı interaktif olarak düzenler.' },
        { command: 'git rebase --continue', description: 'Çakışma çözümünden sonra devam eder.' },
        { command: 'git rebase --abort', description: 'Temellendirmeyi iptal edip önceki duruma döner.' },
        { command: 'git rebase --onto main A B', description: 'B dalını A yerine main üzerine taşır.' },
      ],
      terminalExample: [],
    },
    explanation: {
      title: 'git rebase Nedir?',
      paragraphs: [
        '`git rebase` komutu, bir dalın kayıtlarını başka bir dalın ucuna taşıyarak doğrusal bir geçmiş oluşturur. `git merge` ile aynı sonucu verir ancak birleştirme kaydı oluşturmaz.',
        'İnteraktif mod (`-i`) ile kayıtlar birleştirilebilir, sırası değiştirilebilir veya mesajları düzenlenebilir. Çakışma oluşursa dosyalar düzeltilip `--continue` ile devam edilir.',
      ],
      tips: [
        'Temiz bir geçmiş için `git pull --rebase` tercih edilebilir.',
        '`-i` ile gereksiz kayıtları birleştirerek geçmişi sadeleştirin.',
      ],
      warnings: [
        'Paylaşılmış dallarda kullanmayın, kayıt kimlikleri değişir.',
        'Çakışma çözümünde hata yaparsanız `--abort` ile geri dönün.',
      ],
    },
  },

  'git-cherry-pick': {
    id: 'git-cherry-pick',
    name: 'git cherry-pick',
    category: 'Dallanma',
    syntax: {
      title: 'git cherry-pick',
      usage: [
        { command: 'git cherry-pick <kimlik>', description: 'Belirtilen kaydı mevcut dala uygular.' },
        { command: 'git cherry-pick A..B', description: 'A ile B arasındaki kayıtları uygular.' },
        { command: 'git cherry-pick --no-commit <kimlik>', description: 'Kaydı uygular ama otomatik kayıt oluşturmaz.' },
        { command: 'git cherry-pick --abort', description: 'İşlemi iptal edip önceki duruma döner.' },
      ],
      terminalExample: [],
    },
    explanation: {
      title: 'git cherry-pick Nedir?',
      paragraphs: [
        '`git cherry-pick` komutu, başka bir daldaki belirli bir kaydı alıp mevcut dala uygular. Dalın tamamını birleştirmek yerine yalnızca seçilen değişiklikler aktarılır.',
        'Her cherry-pick yeni bir kayıt kimliği oluşturur. Çakışma oluşursa dosyalar düzeltilip `git add` ve `git cherry-pick --continue` ile devam edilir.',
      ],
      tips: [
        'Acil düzeltmeleri ana dala hızlıca taşımak için idealdir.',
        '`--no-commit` ile birden fazla kaydı tek kayıtta birleştirebilirsiniz.',
      ],
      warnings: [
        'Aynı kayıt farklı dallara uygulanırsa birleştirmede çakışma çıkabilir.',
        'Sık kullanım geçmişin takibini zorlaştırır, birleştirme tercih edilmelidir.',
      ],
    },
  },
};

export default gitCommandsData;
