'use client';
import { useCart } from '../context/CartContext';

export default function LocalizacaoPage() {
  const { t } = useCart();

  return (
    <main className="max-w-4xl mx-auto px-4 md:px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-[#004d40] uppercase tracking-tighter border-l-4 border-[#ff9800] pl-4">
          {t('location')}
        </h1>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-2 pl-5">
          {t('locationValue')}
        </p>
      </div>

      {/* Map embed */}
      <div className="mb-8 rounded-sm overflow-hidden shadow-xl border-2 border-gray-100" style={{ height: 380 }}>
        <iframe
          title="Localização do Mercado Zimpeto no mapa"
          src="https://www.openstreetmap.org/export/embed.html?bbox=32.5300%2C-25.9400%2C32.5800%2C-25.9000&amp;layer=mapnik&amp;marker=-25.9200%2C32.5520"
          className="w-full h-full border-0"
          loading="lazy"
          aria-label="Mapa mostrando localização do Mercado Zimpeto em Maputo"
        ></iframe>
      </div>

      {/* Info grid */}
      <div className="grid md:grid-cols-2 gap-8">
        <section aria-label="Como chegar">
          <h2 className="font-black uppercase text-[10px] tracking-widest text-[#ff9800] mb-5">Como Chegar</h2>
          <ul className="space-y-4" role="list">
            {[
              { icon: '🚌', label: 'Chapa', desc: 'Linha Zimpeto — paragem em frente ao mercado' },
              { icon: '🚗', label: 'Carro', desc: 'Estrada Nacional 1, saída Zimpeto' },
              { icon: '🛵', label: 'Motociclo', desc: 'Estacionamento gratuito disponível' },
            ].map((item) => (
              <li key={item.label} className="flex gap-3">
                <span className="text-xl" aria-hidden="true">{item.icon}</span>
                <div>
                  <p className="font-black uppercase text-[11px] text-[#004d40]">{item.label}</p>
                  <p className="text-[11px] font-medium text-gray-600">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-label="Horários de funcionamento">
          <h2 className="font-black uppercase text-[10px] tracking-widest text-[#ff9800] mb-5">Horários</h2>
          <table className="w-full text-[11px]" aria-label="Horários de funcionamento do mercado">
            <tbody>
              {[
                { day: 'Segunda – Sexta', hours: '06:00 – 18:00', open: true },
                { day: 'Sábado', hours: '06:00 – 16:00', open: true },
                { day: 'Domingo', hours: 'Fechado', open: false },
              ].map((row) => (
                <tr key={row.day} className="border-b border-gray-100 last:border-0">
                  <td className="py-3 font-bold text-gray-700 uppercase">{row.day}</td>
                  <td className="py-3 text-right">
                    <span className={`font-black uppercase px-2 py-1 rounded text-[10px] ${
                      row.open ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-400'
                    }`}>
                      {row.hours}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <a
            href="https://maps.google.com/?q=Mercado+do+Zimpeto+Maputo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 bg-[#004d40] text-white px-6 py-3 font-black uppercase text-[10px] tracking-widest hover:bg-[#ff9800] focus:outline-none focus:ring-2 focus:ring-[#ff9800] focus:ring-offset-2 transition-colors rounded-sm"
          >
            <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Abrir no Google Maps
          </a>
        </section>
      </div>
    </main>
  );
}
