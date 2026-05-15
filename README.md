# 🕌 Waikato Prayer Times

> Official prayer times Progressive Web App for **Hamilton Jamia Mosque** and the Waikato Muslim community, New Zealand.

**Live app → [nextwave-nz.github.io/prayer-times](https://nextwave-nz.github.io/prayer-times/)**

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🕐 **Daily Prayer Times** | Iqama (congregation) times for Hamilton Jamia Mosque |
| ⏱️ **Live Countdown** | Real-time countdown to next prayer |
| 🌙 **Ramadan Calendar** | Full 30-day Suhoor & Iftar schedule (FIANZ + WMA) |
| ☑️ **Prayer Tracker** | Mark prayers, build your daily streak |
| 📖 **Daily Hadith** | 30 verified hadiths with Arabic & translation |
| 🤲 **Duas** | Iftar & Suhoor duas in Arabic with transliteration |
| 📴 **Works Offline** | Installable PWA — works without internet after first load |
| 🔔 **Prayer Notifications** | Get reminded before each prayer |
| 📅 **Friday Jummah** | Khutbah reminder at 1:40 PM |

---

## 📱 Install on Your Phone

### iPhone (Safari)
1. Open the app link in Safari
2. Tap the **Share** button → **Add to Home Screen**
3. Tap **Add** — done!

### Android (Chrome)
1. Open the app link in Chrome
2. Tap the **Install** banner or menu → **Add to Home Screen**
3. Tap **Install** — done!

---

## 🏗️ Tech Stack

- **Pure HTML/CSS/JS** — no frameworks, no dependencies
- **PWA** — Service Worker for offline caching and update notifications
- **GitHub Pages** — hosted and deployed automatically on push
- **Design** — Navy & Gold luxury palette, mobile-first, responsive

---

## 📂 File Structure

```
prayer-times/
├── index.html          # Main app
├── admin.html          # Admin panel (mosque data management)
├── sw.js               # Service Worker (offline + update notifications)
├── manifest.json       # PWA manifest
├── privacy-policy.html # Privacy policy (required for app stores)
├── icon-192.png        # App icon (192×192)
├── icon-512.png        # App icon (512×512)
├── screenshots/        # PWA store screenshots
└── adhan/              # Adhan audio files
```

---

## 🔄 Monthly Updates

Prayer times are updated monthly from the WMA timetable PDF:

1. Go to **admin.html**
2. Upload the new WMA PDF
3. Review extracted times
4. Click **Publish to GitHub**

---

## 🕌 Mosque Information

**Hamilton Jamia Mosque**  
921 Heaphy Terrace, Hamilton, New Zealand  
📞 07 855 0567  
📧 wma@xtra.co.nz  
🕌 Friday Khutbah: **1:40 PM**

---

## 📊 Data Sources

- **Iqama times** — Waikato Muslim Association (WMA) monthly timetables
- **Suhoor / Iftar** — FIANZ Hamilton Ramadan Calendar
- **Hadiths** — Verified authentic sources (Bukhari, Muslim, Abu Dawud, Tirmidhi)

---

## 🔒 Privacy

This app collects **zero personal data**. All preferences (notifications, prayer tracking) are stored locally on your device only.

[Privacy Policy](https://nextwave-nz.github.io/prayer-times/privacy-policy.html)

---

## 👨‍💻 Developer

Built and maintained by **[Next Wave NZ](https://nextwave.nz)**  
For the Waikato Muslim community 🤲

---

*Ramadan Mubarak — May Allah accept our prayers* 🌙
