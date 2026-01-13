# Android APK Oluşturma Talimatları

Bu uygulama Capacitor kullanılarak Android için hazırlanmıştır. APK oluşturmak için iki yöntem var:

## Yöntem 1: GitHub Actions ile Otomatik Build (Önerilen)

1. Bu projeyi GitHub'a yükleyin:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. GitHub'da bir tag oluşturun:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

3. GitHub Actions otomatik olarak APK'yı oluşturacak ve Releases bölümüne yükleyecektir.

4. GitHub repo'nuzun Releases sayfasından APK'yı indirebilirsiniz.

## Yöntem 2: Yerel Build (Android Studio Gerekli)

1. Android Studio'yu kurun: https://developer.android.com/studio

2. Projeyi build edin:
   ```bash
   npm run build
   npm run cap:sync
   ```

3. Android Studio'yu açın ve `android` klasörünü proje olarak açın.

4. Build > Generate Signed Bundle / APK seçeneğini seçin.

5. APK'yı seçin ve keystore oluşturun (veya mevcut bir keystore kullanın).

6. APK dosyası `android/app/build/outputs/apk/release/` klasöründe oluşturulacaktır.

## Hızlı Test Build (Debug APK)

Debug APK oluşturmak için (imzalama gerektirmez):

```bash
npm run build
npm run cap:sync
cd android
./gradlew assembleDebug
```

APK dosyası: `android/app/build/outputs/apk/debug/app-debug.apk`

