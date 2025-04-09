# 🧠 Git Cheat Sheet

## 🚀 Başlangıç Komutları

| Komut | Açıklama |
|-------|----------|
| `git init` | Yeni bir Git deposu oluşturur. |
| `git clone <repo-url>` | Uzak bir depoyu yerel makineye kopyalar. |
| `git config --global user.name "Ad Soyad"` | Kullanıcı adını tanımlar. |
| `git config --global user.email "email@example.com"` | Kullanıcı e-posta adresini tanımlar. |

## 📦 Temel Kullanım

| Komut | Açıklama |
|-------|----------|
| `git status` | Deponun mevcut durumunu gösterir. |
| `git add <dosya>` | Dosyayı staging alanına ekler. |
| `git add .` | Tüm değişiklikleri staging alanına ekler. |
| `git commit -m "Mesaj"` | Staging alanındaki değişiklikleri kaydeder. |
| `git log` | Commit geçmişini gösterir. |
| `git diff` | Değişiklikleri karşılaştırır (staged vs. unstaged). |

## 🌲 Branch (Dal) Yönetimi

| Komut | Açıklama |
|-------|----------|
| `git branch` | Mevcut branch'leri listeler. |
| `git branch <yeni-branch>` | Yeni bir branch oluşturur. |
| `git checkout <branch>` | Belirtilen branch'e geçiş yapar. |
| `git switch <branch>` | (YENİ) Belirtilen branch'e geçiş yapar. |
| `git checkout -b <yeni-branch>` | Yeni bir branch oluşturup ona geçiş yapar. |
| `git merge <branch>` | Belirtilen branch'i şu anki branch ile birleştirir. |
| `git branch -d <branch>` | Branch'i siler. |

## 🔄 Uzak Depo İşlemleri

| Komut | Açıklama |
|-------|----------|
| `git remote -v` | Uzak bağlantıları listeler. |
| `git remote add origin <url>` | Uzak depo bağlantısı ekler. |
| `git fetch` | Uzak depodaki değişiklikleri alır ama birleştirmez. |
| `git pull` | Uzak depodaki değişiklikleri alır ve birleştirir. |
| `git push` | Yerel değişiklikleri uzak depoya gönderir. |
| `git push -u origin <branch>` | İlk kez push ederken branch'i tanımlar. |

## 💥 Hataları Geri Alma

| Komut | Açıklama |
|-------|----------|
| `git reset --soft HEAD~1` | Son commit'i geri alır ama değişiklikleri korur. |
| `git reset --hard HEAD~1` | Son commit'i ve değişiklikleri tamamen siler. |
| `git restore <dosya>` | Değişiklikleri geri alır. |
| `git revert <commit-id>` | Belirtilen commit'i geri alır (yeni bir commit ile). |

## 🛠️ Gelişmiş Kullanım

| Komut | Açıklama |
|-------|----------|
| `git stash` | Değişiklikleri geçici olarak saklar. |
| `git stash pop` | Saklanan değişiklikleri geri getirir. |
| `git rebase <branch>` | Branch'i başka bir branch'in üzerine yeniden yazar. |
| `git cherry-pick <commit-id>` | Belirli bir commit'i başka bir branch'e uygular. |
| `git tag <etiket>` | Belirli bir commit'e etiket verir. |

## 🔍 Commit Arama

| Komut | Açıklama |
|-------|----------|
| `git log --oneline` | Kısa commit geçmişi. |
| `git log --graph --all --decorate` | Görsel commit ağacı. |
| `git blame <dosya>` | Satır satır kim ne zaman değiştirmiş. |
| `git show <commit-id>` | Belirli bir commit’in detaylarını gösterir. |

## 🧹 Temizlik

| Komut | Açıklama |
|-------|----------|
| `git clean -fd` | Takip edilmeyen dosya ve klasörleri siler. |
| `git gc` | Gereksiz dosyaları temizleyip depo boyutunu küçültür. |

---

