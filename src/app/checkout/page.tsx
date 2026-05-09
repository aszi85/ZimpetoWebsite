'use client';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, cartTotal, cartCount, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    nome: '', telemovel: '', endereco: '', nuit: '', emergencia: '', notas: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'banco' | ''>('');
  const [agreed, setAgreed] = useState(false);

  const handleField = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData(prev => ({ ...prev, [field]: e.target.value }));

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.telemovel || !formData.endereco) return;
    setStep(2);
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentMethod) { alert('Por favor, seleccione um método de pagamento.'); return; }
    setStep(3);
  };

  const handleConfirm = () => {
    clearCart();
    router.push('/');
  };

  if (cartCount === 0 && step === 1) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center pb-24">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-black text-[#004d40] uppercase italic mb-3">O seu cesto está vazio</h1>
        <p className="text-gray-500 mb-8 font-medium">Adicione produtos antes de proceder ao checkout.</p>
        <button onClick={() => router.push('/loja')} className="bg-[#ff9800] text-white px-8 py-4 font-black uppercase text-[11px] tracking-widest hover:bg-[#004d40] transition-colors">
          Ir à Loja
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 pb-24">
      {/* Step Indicator */}
      <div className="flex mb-10">
        {[
          { n: 1, label: 'Detalhes' },
          { n: 2, label: 'Pagamento' },
          { n: 3, label: 'Confirmação' },
        ].map((s, i) => (
          <div key={s.n} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black border-2 transition-colors ${
                step >= s.n ? 'bg-[#004d40] border-[#004d40] text-white' : 'bg-white border-gray-200 text-gray-400'
              }`}>
                {step > s.n ? '✓' : s.n}
              </div>
              <span className={`text-[9px] font-black uppercase tracking-wider ${step >= s.n ? 'text-[#004d40]' : 'text-gray-300'}`}>
                {s.label}
              </span>
            </div>
            {i < 2 && <div className={`flex-1 h-0.5 mx-2 mb-4 ${step > s.n ? 'bg-[#004d40]' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left - Form */}
        <div className="lg:col-span-2">

          {/* STEP 1: Delivery Details */}
          {step === 1 && (
            <div className="bg-white p-8 border-t-4 border-[#004d40] shadow-sm animate-fadeIn">
              <h2 className="text-2xl font-black text-[#004d40] uppercase italic tracking-tighter mb-6">Informações de Entrega</h2>
              <form onSubmit={handleStep1} className="space-y-5">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 block mb-1">Nome Completo *</label>
                  <input
                    type="text" required value={formData.nome} onChange={handleField('nome')}
                    placeholder="Ex: João Machava"
                    className="w-full border-b-2 border-gray-200 focus:border-[#ff9800] py-3 text-[13px] font-medium outline-none transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 block mb-1">Telemóvel (M-Pesa) *</label>
                    <input
                      type="tel" required value={formData.telemovel} onChange={handleField('telemovel')}
                      placeholder="84 000 0000"
                      className="w-full border-b-2 border-gray-200 focus:border-[#ff9800] py-3 text-[13px] font-medium outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 block mb-1">NUIT (opcional)</label>
                    <input
                      type="text" value={formData.nuit} onChange={handleField('nuit')}
                      placeholder="Para factura com NUIT"
                      className="w-full border-b-2 border-gray-200 focus:border-[#ff9800] py-3 text-[13px] font-medium outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 block mb-1">Endereço de Entrega *</label>
                  <input
                    type="text" required value={formData.endereco} onChange={handleField('endereco')}
                    placeholder="Bairro, Rua, Número..."
                    className="w-full border-b-2 border-gray-200 focus:border-[#ff9800] py-3 text-[13px] font-medium outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 block mb-1">Contacto de Emergência</label>
                  <input
                    type="tel" value={formData.emergencia} onChange={handleField('emergencia')}
                    placeholder="Número alternativo"
                    className="w-full border-b-2 border-gray-200 focus:border-[#ff9800] py-3 text-[13px] font-medium outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 block mb-1">Notas para Entrega</label>
                  <textarea
                    value={formData.notas} onChange={handleField('notas')}
                    rows={2}
                    placeholder="Instruções especiais, ponto de referência..."
                    className="w-full border-b-2 border-gray-200 focus:border-[#ff9800] py-3 text-[13px] font-medium outline-none transition-colors resize-none"
                  />
                </div>
                <button type="submit" className="w-full bg-[#ff9800] text-white py-4 font-black uppercase text-[11px] tracking-[0.15em] hover:bg-[#004d40] transition-colors mt-2">
                  Continuar para Pagamento →
                </button>
              </form>
            </div>
          )}

          {/* STEP 2: Payment */}
          {step === 2 && (
            <div className="bg-white p-8 border-t-4 border-[#004d40] shadow-sm animate-fadeIn">
              <h2 className="text-2xl font-black text-[#004d40] uppercase italic tracking-tighter mb-6">Método de Pagamento</h2>
              <form onSubmit={handleStep2} className="space-y-4">
                {/* M-Pesa */}
                <label className={`flex gap-4 p-5 border-2 cursor-pointer transition-colors ${paymentMethod === 'mpesa' ? 'border-[#004d40] bg-[#f0faf7]' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" name="payment" value="mpesa" className="mt-1" onChange={() => setPaymentMethod('mpesa')} />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-lg font-black italic text-red-600">M-PESA</span>
                      <span className="bg-green-100 text-green-700 text-[9px] font-black px-2 py-0.5 uppercase">Recomendado</span>
                    </div>
                    <p className="text-[11px] font-bold text-gray-600">Número: <span className="text-[#004d40] font-black">84 123 4567</span></p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Zimpeto Wholesale LDA</p>
                  </div>
                </label>

                {/* Bank Transfer */}
                <label className={`flex gap-4 p-5 border-2 cursor-pointer transition-colors ${paymentMethod === 'banco' ? 'border-[#004d40] bg-[#f0faf7]' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" name="payment" value="banco" className="mt-1" onChange={() => setPaymentMethod('banco')} />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-lg font-black italic text-blue-800">Banco</span>
                    </div>
                    <p className="text-[11px] font-bold text-gray-600">NIB Millennium BIM: <span className="text-[#004d40] font-black">0001 2345 6789 00</span></p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Ref: {formData.telemovel || 'use o seu nº de telemóvel'}</p>
                  </div>
                </label>

                {/* VISA - disabled */}
                <div className="flex gap-4 p-5 border-2 border-gray-100 opacity-40 cursor-not-allowed">
                  <div className="flex-1">
                    <div className="text-lg font-black italic text-gray-400 mb-1">VISA / Cartão</div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Indisponível de momento</p>
                  </div>
                </div>

                <div className="bg-amber-50 border-l-4 border-[#ff9800] p-4 mt-4">
                  <p className="text-[10px] font-black text-[#004d40] uppercase mb-1">Importante:</p>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    Após o pagamento, envie o comprovativo para WhatsApp <strong>84 000 0000</strong>.
                    A encomenda sai do armazém apenas após verificação do crédito.
                  </p>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <input type="checkbox" id="agree" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-1" />
                  <label htmlFor="agree" className="text-[11px] text-gray-600 font-medium cursor-pointer">
                    Li e aceito os termos e condições de entrega e pagamento.
                  </label>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="px-6 py-3 border-2 border-gray-200 text-[10px] font-black uppercase tracking-wider text-gray-500 hover:border-[#004d40] hover:text-[#004d40] transition-colors">
                    ← Voltar
                  </button>
                  <button type="submit" disabled={!agreed} className={`flex-1 py-4 font-black uppercase text-[11px] tracking-[0.15em] transition-colors ${agreed ? 'bg-[#ff9800] text-white hover:bg-[#004d40]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                    Confirmar Encomenda →
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: Confirmation */}
          {step === 3 && (
            <div className="bg-white p-8 border-t-4 border-green-600 shadow-sm animate-fadeIn text-center">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-black text-[#004d40] uppercase italic tracking-tighter mb-3">Encomenda Confirmada!</h2>
              <p className="text-gray-600 font-medium mb-6 text-sm">
                Recebemos a sua encomenda. Assim que confirmarmos o pagamento, a sua encomenda será processada e entregue em 24–48h.
              </p>

              <div className="bg-[#f0faf7] p-5 rounded-sm text-left mb-6 space-y-2">
                <div className="flex justify-between text-[11px]">
                  <span className="font-bold text-gray-500 uppercase">Nome</span>
                  <span className="font-black text-[#004d40]">{formData.nome}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="font-bold text-gray-500 uppercase">Telemóvel</span>
                  <span className="font-black text-[#004d40]">{formData.telemovel}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="font-bold text-gray-500 uppercase">Entrega</span>
                  <span className="font-black text-[#004d40] max-w-[200px] text-right">{formData.endereco}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="font-bold text-gray-500 uppercase">Pagamento</span>
                  <span className="font-black text-[#004d40] uppercase">{paymentMethod}</span>
                </div>
              </div>

              <p className="text-[10px] text-gray-400 mb-6 font-medium">
                Envie o comprovativo de pagamento para WhatsApp: <strong className="text-[#004d40]">+258 84 000 0000</strong>
              </p>

              <button
                onClick={handleConfirm}
                className="w-full bg-[#004d40] text-white py-4 font-black uppercase text-[11px] tracking-[0.15em] hover:bg-[#1a1a1a] transition-colors"
              >
                Voltar ao Início
              </button>
            </div>
          )}
        </div>

        {/* Right - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border-t-4 border-[#ff9800] p-5 shadow-sm sticky top-24">
            <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-[#004d40] mb-4">Resumo da Encomenda</h3>
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {cart.map(item => (
                <div key={item.id} className="flex gap-3 items-center">
                  <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 border border-gray-100">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black uppercase text-gray-700 truncate">{item.name}</p>
                    <p className="text-[9px] text-gray-400 font-medium">x{item.qtd}</p>
                  </div>
                  <span className="text-[11px] font-black text-[#004d40] whitespace-nowrap">
                    {(item.price * item.qtd).toLocaleString('pt-MZ')} MT
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-4 space-y-2">
              <div className="flex justify-between text-[11px]">
                <span className="font-medium text-gray-500">Subtotal</span>
                <span className="font-black">{cartTotal.toLocaleString('pt-MZ')} MT</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="font-medium text-gray-500">Entrega</span>
                <span className="font-black text-green-700">{cartTotal >= 5000 ? 'Gratuita' : 'A calcular'}</span>
              </div>
              <div className="flex justify-between text-[14px] pt-2 border-t border-gray-100">
                <span className="font-black text-gray-800 uppercase">Total</span>
                <span className="font-black text-[#004d40] text-xl">{cartTotal.toLocaleString('pt-MZ')} MT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
