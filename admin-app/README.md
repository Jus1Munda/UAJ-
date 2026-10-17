# UAJ Web Tech — Admin Console (.exe & .apk)

Standalone executive management client for **UAJ Web Tech**. Connects to your live website database to manage client inquiries, review budgets, update project statuses, and record internal studio notes.

---

## 🖥️ How to Build the Windows Desktop App (.exe)

This uses **Electron** to build a native Windows installer (`.exe`) and portable executable.

### 1. Requirements
- Node.js (v18 or higher)
- Windows PC (or Wine on Linux/Mac)

### 2. Steps to Compile:
```bash
# 1. Navigate to the admin-app folder
cd admin-app

# 2. Install dependencies
npm install

# 3. Test running the desktop window locally
npm run electron:dev

# 4. Generate the Windows .exe installer
npm run build:exe
```

### Output:
The generated `.exe` file will be located in:
```
admin-app/dist-electron/UAJ Admin Console Setup 1.0.0.exe
admin-app/dist-electron/UAJ Admin Console 1.0.0.exe (Portable)
```
Double-click the `.exe` to install and run it on any Windows PC.

---

## 📱 How to Build the Android Mobile App (.apk)

This uses **Capacitor** to compile a native Android APK.

### 1. Requirements
- Node.js (v18 or higher)
- Android Studio with Android SDK installed

### 2. Steps to Compile:
```bash
# 1. Navigate to the admin-app folder
cd admin-app

# 2. Install dependencies
npm install

# 3. Build the web distribution
npm run build

# 4. Add the Android platform (first time only)
npx cap add android

# 5. Sync the files to Android
npx cap sync android

# 6. Open the project in Android Studio
npx cap open android
```

### 3. Generate the .apk in Android Studio:
1. In Android Studio, click **Build** in the top menu.
2. Select **Build Bundle(s) / APK(s)** > **Build APK(s)**.
3. Once completed, click the **"locate"** link.

### Output:
Your installable APK will be at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```
Transfer this `.apk` to your Android phone via USB, Google Drive, or Telegram and tap it to install.

---

## ⚡ Instant App Option (No Compiling Required)
You can also open the Admin Console in Google Chrome on your PC or Android phone and tap:
- **On PC (Chrome/Edge):** Click the **Install** icon in the address bar. It creates an independent desktop app icon on your Windows desktop.
- **On Android (Chrome):** Tap the 3 dots menu > **"Add to Home Screen"** or **"Install app"**. It installs as a full-screen native-feeling app on your home screen.

---

## 🔐 Default Access Passkey
- **Passkey**: `admin2026`
- **Demo Access**: Click the `[ Quick Demo Passkey: admin2026 ]` button on the login screen.
