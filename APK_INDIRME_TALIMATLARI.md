# 📱 Android APK İndirme Talimatları

Uygulamanız Android için hazır! APK'yı indirmek için aşağıdaki adımları izleyin:

## 🚀 Hızlı Yöntem: GitHub Actions (Önerilen - 5-10 dakika)

### Adım 1: GitHub'a Yükleme

1. GitHub'da yeni bir repository oluşturun (https://github.com/new)
2. Repository adı: `tarihte-bugun` (veya istediğiniz bir isim)
3. Repository'yi oluşturun

4. Terminal'de şu komutları çalıştırın:

```bash
git init
git add .
git commit -m "Android uygulaması hazır"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/tarihte-bugun.git
git push -u origin main
```

**Not:** `KULLANICI_ADINIZ` yerine kendi GitHub kullanıcı adınızı yazın.

### Adım 2: APK Oluşturma

1. GitHub'da repository'nize gidin
2. "Releases" bölümüne gidin (sağ tarafta)
3. "Create a new release" butonuna tıklayın
4. Tag: `v1.0.0` yazın
5. Release title: `v1.0.0` yazın
6. "Publish release" butonuna tıklayın

### Adım 3: APK İndirme

1. Birkaç dakika bekleyin (GitHub Actions APK'yı oluşturuyor)
2. "Actions" sekmesine gidin
3. Build tamamlandığında (yeşil tik işareti), "Releases" sayfasına dönün
4. Release'in altında APK dosyasını göreceksiniz
5. APK'yı telefonunuza indirin ve kurun

**APK Linki:** Release oluşturduktan sonra şu formatta olacak:
`https://github.com/KULLANICI_ADINIZ/tarihte-bugun/releases/download/v1.0.0/app-release.apk`

---

## 🔧 Alternatif Yöntem: Yerel Build (Android Studio Gerekli)

Eğer Android Studio kuruluysa:

1. Android Studio'yu açın
2. `File > Open` ile `android` klasörünü açın
3. Gradle sync tamamlanana kadar bekleyin
4. `Build > Build Bundle(s) / APK(s) > Build APK(s)` seçin
5. Build tamamlandığında, `android/app/build/outputs/apk/debug/app-debug.apk` dosyasını bulun

---

## ⚠️ Önemli Notlar

- İlk kez APK kurarken, telefonunuzda "Bilinmeyen kaynaklardan uygulama yükleme" iznini açmanız gerekebilir
- APK'yı indirdikten sonra, dosya yöneticisinden açarak kurabilirsiniz
- Güvenlik uyarısı çıkarsa "Yine de yükle" seçeneğini seçin

---

## 📞 Sorun mu yaşıyorsunuz?

1. GitHub Actions build başarısız olursa, "Actions" sekmesinden logları kontrol edin
2. Yerel build için Android Studio ve Android SDK'nın kurulu olduğundan emin olun
3. Proje yolunda Türkçe karakter sorunu için `android/gradle.properties` dosyasında `android.overridePathCheck=true` ayarı zaten eklenmiş durumda

---

**Hazır!** APK'yı indirip telefonunuza kurabilirsiniz. 🎉

