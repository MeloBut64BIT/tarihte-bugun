// Wikipedia API servisi

/**
 * Wikipedia On This Day API'den belirli bir tarihin olaylarını çeker
 * @param {number} ay - Ay (1-12)
 * @param {number} gun - Gün (1-31)
 * @returns {Promise<Object>} API yanıtı
 */
export async function wikipediaOlaylariGetir(ay, gun) {
  try {
    // Ay ve günü 2 haneli string formatına çevir
    const ayStr = String(ay).padStart(2, '0')
    const gunStr = String(gun).padStart(2, '0')
    
    const url = `https://api.wikimedia.org/feed/v1/wikipedia/tr/onthisday/all/${ayStr}/${gunStr}`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Wikipedia API hatası:', error)
    throw error
  }
}

/**
 * Wikipedia API yanıtını işleyip olay listesi oluşturur
 * @param {Object} apiData - Wikipedia API yanıtı
 * @returns {Array} İşlenmiş olay listesi
 */
export function olaylariIsle(apiData) {
  const olaylar = []
  
  // Events (olaylar) kısmını işle
  if (apiData.events && Array.isArray(apiData.events)) {
    apiData.events.forEach((olay) => {
      olaylar.push({
        yil: olay.year || 'Bilinmiyor',
        baslik: olay.text || 'Başlık yok',
        aciklama: olay.text || '',
        wikipedia: olay.pages && olay.pages.length > 0 ? olay.pages[0] : null,
        gorsel: olay.pages && olay.pages.length > 0 && olay.pages[0].thumbnail 
          ? olay.pages[0].thumbnail.source 
          : null,
        tip: 'event'
      })
    })
  }
  
  // Births (doğumlar) kısmını işle
  if (apiData.births && Array.isArray(apiData.births)) {
    apiData.births.forEach((olay) => {
      olaylar.push({
        yil: olay.year || 'Bilinmiyor',
        baslik: olay.text || 'Başlık yok',
        aciklama: olay.text || '',
        wikipedia: olay.pages && olay.pages.length > 0 ? olay.pages[0] : null,
        gorsel: olay.pages && olay.pages.length > 0 && olay.pages[0].thumbnail 
          ? olay.pages[0].thumbnail.source 
          : null,
        tip: 'birth'
      })
    })
  }
  
  // Deaths (ölümler) kısmını işle
  if (apiData.deaths && Array.isArray(apiData.deaths)) {
    apiData.deaths.forEach((olay) => {
      olaylar.push({
        yil: olay.year || 'Bilinmiyor',
        baslik: olay.text || 'Başlık yok',
        aciklama: olay.text || '',
        wikipedia: olay.pages && olay.pages.length > 0 ? olay.pages[0] : null,
        gorsel: olay.pages && olay.pages.length > 0 && olay.pages[0].thumbnail 
          ? olay.pages[0].thumbnail.source 
          : null,
        tip: 'death'
      })
    })
  }
  
  return olaylar
}

/**
 * Wikipedia sayfasından detaylı açıklama çeker
 * @param {string} title - Wikipedia sayfa başlığı
 * @returns {Promise<string>} Sayfa açıklaması
 */
export async function wikipediaDetayGetir(title) {
  try {
    const url = `https://tr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
    const response = await fetch(url)
    
    if (!response.ok) {
      return null
    }
    
    const data = await response.json()
    return data.extract || null
  } catch (error) {
    console.error('Wikipedia detay hatası:', error)
    return null
  }
}

