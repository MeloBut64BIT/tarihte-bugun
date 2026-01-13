import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import SideMenu from './components/SideMenu'
import ContentArea from './components/ContentArea'
import Footer from './components/Footer'

function App() {
  const [menuAcik, setMenuAcik] = useState(false)
  const [seciliTarih, setSeciliTarih] = useState(new Date())
  const [seciliOlay, setSeciliOlay] = useState(null)

  useEffect(() => {
    // İlk yüklemede bugünün tarihini ayarla
    setSeciliTarih(new Date())
  }, [])

  const tarihSecildi = (tarih) => {
    setSeciliTarih(tarih)
    setSeciliOlay(null) // Yeni tarih seçildiğinde olayı temizle
  }

  const olaySecildi = (olay) => {
    setSeciliOlay(olay)
    setMenuAcik(false) // Menüyü kapat
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-islamic-cream via-islamic-beige to-islamic-light flex flex-col">
      {/* Header */}
      <header className="bg-islamic-dark text-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => setMenuAcik(!menuAcik)}
            className="p-2 hover:bg-islamic-green rounded-lg transition-colors"
            aria-label="Menü"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold text-center flex-1 font-freshman">Tarihte Bugün</h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </header>

      {/* Side Menu */}
      <SideMenu 
        acik={menuAcik} 
        kapat={() => setMenuAcik(false)}
        tarihSecildi={tarihSecildi}
        olaySecildi={olaySecildi}
        seciliTarih={seciliTarih}
        seciliOlay={seciliOlay}
      />

      {/* Overlay */}
      {menuAcik && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
          onClick={() => setMenuAcik(false)}
        />
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-6 flex-1">
        {seciliOlay ? (
          <ContentArea olay={seciliOlay} tarih={seciliTarih} />
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center border border-islamic-light/20">
              <h2 className="text-2xl font-bold text-islamic-dark mb-4">
                Bir Olay Seçin
              </h2>
              <p className="text-islamic-dark/70">
                Sol menüden bir tarih seçin ve o günün olaylarından birini seçerek detayları görüntüleyin.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App

