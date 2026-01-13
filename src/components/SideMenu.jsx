import { useState, useEffect } from 'react'
import { X, Calendar as CalendarIcon } from 'lucide-react'
import { son30Gun } from '../data/events'
import { formatKisaTarih } from '../utils/calendar'
import { wikipediaOlaylariGetir, olaylariIsle } from '../services/wikipedia'
import EventList from './EventList'

function SideMenu({ acik, kapat, tarihSecildi, olaySecildi, seciliTarih, seciliOlay }) {
  const gunler = son30Gun()
  const [seciliGunTarih, setSeciliGunTarih] = useState(seciliTarih || new Date())
  const [olaylar, setOlaylar] = useState([])
  const [yukleniyor, setYukleniyor] = useState(false)
  const [hata, setHata] = useState(null)

  // Tarih değiştiğinde olayları yükle
  useEffect(() => {
    if (seciliTarih) {
      const tarihKopya = new Date(seciliTarih)
      tarihKopya.setHours(0, 0, 0, 0)
      const mevcutTarih = new Date(seciliGunTarih)
      mevcutTarih.setHours(0, 0, 0, 0)
      
      if (tarihKopya.getTime() !== mevcutTarih.getTime()) {
        setSeciliGunTarih(seciliTarih)
        olaylariYukle(seciliTarih)
      }
    }
  }, [seciliTarih])

  const olaylariYukle = async (tarih) => {
    setYukleniyor(true)
    setHata(null)
    
    try {
      const ay = tarih.getMonth() + 1
      const gun = tarih.getDate()
      const apiData = await wikipediaOlaylariGetir(ay, gun)
      const islenmisOlaylar = olaylariIsle(apiData)
      setOlaylar(islenmisOlaylar)
    } catch (error) {
      console.error('Olaylar yüklenirken hata:', error)
      setHata('Olaylar yüklenirken bir hata oluştu. Lütfen tekrar deneyin.')
      setOlaylar([])
    } finally {
      setYukleniyor(false)
    }
  }

  const handleGunSec = (tarih) => {
    setSeciliGunTarih(tarih)
    tarihSecildi(tarih)
    olaylariYukle(tarih)
  }

  return (
    <div
      className={`fixed left-0 top-0 h-full w-80 bg-islamic-dark text-white z-50 transform transition-transform duration-300 ease-in-out ${
        acik ? 'translate-x-0' : '-translate-x-full'
      } shadow-2xl`}
    >
      {/* Menu Header */}
      <div className="flex items-center justify-between p-4 border-b border-islamic-green">
        <h2 className="text-xl font-bold">Tarih Seç</h2>
        <button
          onClick={kapat}
          className="p-2 hover:bg-islamic-green rounded-lg transition-colors"
          aria-label="Menüyü Kapat"
        >
          <X size={24} />
        </button>
      </div>

      {/* Gün Seçici */}
      <div className="p-4 border-b border-islamic-green/20 bg-islamic-dark/50">
        <div className="text-sm text-islamic-beige mb-2">Gün Seçin</div>
        <div className="overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {gunler.map((tarih, index) => {
              const bugun = new Date()
              bugun.setHours(0, 0, 0, 0)
              const tarihKopya = new Date(tarih)
              tarihKopya.setHours(0, 0, 0, 0)
              const bugunMu = tarihKopya.getTime() === bugun.getTime()
              const seciliGunKopya = new Date(seciliGunTarih)
              seciliGunKopya.setHours(0, 0, 0, 0)
              const seciliMi = seciliGunTarih && 
                tarihKopya.getTime() === seciliGunKopya.getTime()

              return (
                <button
                  key={index}
                  onClick={() => handleGunSec(tarih)}
                  className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    seciliMi
                      ? 'bg-islamic-green text-white'
                      : 'bg-islamic-dark/50 text-islamic-beige hover:bg-islamic-green/30'
                  } ${bugunMu ? 'ring-2 ring-islamic-beige' : ''}`}
                >
                  {formatKisaTarih(tarih)}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Olay Listesi */}
      <div className="overflow-y-auto h-[calc(100vh-200px)] p-4">
        {hata && (
          <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-4 mb-4 text-red-200 text-sm">
            {hata}
          </div>
        )}
        
        {seciliGunTarih && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <CalendarIcon size={18} className="text-islamic-green" />
              <h3 className="text-lg font-semibold text-white">
                {formatKisaTarih(seciliGunTarih)} Olayları
              </h3>
            </div>
            <EventList
              olaylar={olaylar}
              seciliOlay={seciliOlay}
              olaySecildi={olaySecildi}
              yukleniyor={yukleniyor}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default SideMenu

