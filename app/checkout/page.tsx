'use client';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';

interface FormData {
  nome: string;
  telemovel: string;
  endereco: string;
  nuit: string;
  emergencia: string;
}
interface FormErrors {
  nome?: string;
  telemovel?: string;
  endereco?: string;
}

export default function CheckoutPage() {
  const { cartTotal, cart, t } = useCart();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    nome: '', telemovel: '', endereco: '', nuit: '', emergencia: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!formData.nome.trim()) errs.nome = t('nameError');
    if (!formData.telemovel.trim() || !/^\d{9}$/.test(formData.telemovel.replace(/\s/g, ''))) {
      errs.telemovel = t('phoneError');
    }
    if (!formData.endereco.trim()) errs.endereco = t('addressError');
    return errs;
  };

  const handleBlur = (field: string) => {
    setTouchedFields((prev) => new Set(prev).add(field));
    setErrors(validate());
  };

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setTouchedFields(new Set(['nome', 'telemovel', 'endereco']));
    if (Object.keys(errs).length === 0) setStep(2);
  };

  if (cart.length === 0 && step === 1) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <svg aria-hidden="true" className="w-20 h-20 text-gray-200 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h1 className="text-2xl font-black text-[#004d40] uppercase mb-3">{t('emptyCart')}</h1>
        <a href="/loja" className="text-[#ff9800] font-black uppercase text-sm underline focus:outline-none">{t('backToStore')}</a>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-14">

      {/* STEP INDICATOR — Nielsen: visibility of system status */}
      <nav aria-label="Etapas do checkout" className="flex gap-2 mb-10">
        <div className={`flex-1 border-b-4 pb-2 transition-colors ${step >= 1 ? 'border-[#004d40]' : 'border-gray-200'}`}>
          <p className={`text-[9px] font-black uppercase tracking-widest ${step >= 1 ? 'text-[#004d40]' : 'text-gray-300'}`}>
            01 — {t('deliveryDetails')}
          </p>
          {step === 1 && <p className="text-[8px] text-[#ff9800] font-bold uppercase mt-0.5">← Passo actual</p>}
        </div>
        <div className={`flex-1 border-b-4 pb-2 transition-colors text-right ${step === 2 ? 'border-[#ff9800]' : 'border-gray-200'}`}>
          <p className={`text-[9px] font-black uppercase tracking-widest ${step === 2 ? 'text-[#004d40]' : 'text-gray-300'}`}>
            02 — {t('paymentConfirm')}
          </p>
          {step === 2 && <p className="text-[8px] text-[#ff9800] font-bold uppercase mt-0.5">Passo actual →</p>}
        </div>
      </nav>

      {step === 1 ? (
        <div className="bg-white p-6 md:p-10 shadow-xl border-t-4 border-[#004d40]">
          <h2 className="text-2xl font-black text-[#004d40] uppercase tracking-tighter mb-8">{t('billingInfo')}</h2>

          {/* Cart summary — Norman: feedback, shows what they're buying */}
          <div className="bg-gray-50 border border-gray-100 rounded-sm p-4 mb-8">
            <p className="text-[10px] font-black uppercase text-gray-400 mb-3">Resumo do Pedido</p>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-[11px] font-bold py-1.5 border-b border-gray-100 last:border-0">
                <span className="text-gray-600 uppercase truncate mr-4">{item.name} × {item.qtd}</span>
                <span className="text-[#004d40] shrink-0">{(item.price * item.qtd).toLocaleString()} MT</span>
              </div>
            ))}
            <div className="flex justify-between font-black text-[#004d40] pt-3 text-sm">
              <span>{t('total')}</span>
              <span>{cartTotal.toLocaleString()},00 MT</span>
            </div>
          </div>

          <form onSubmit={handleSubmitDetails} noValidate aria-label="Formulário de dados de entrega">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Nome */}
              <div className="md:col-span-2">
                <label htmlFor="nome" className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5">
                  {t('fullName')} <span className="text-red-500" aria-label="obrigatório">*</span>
                </label>
                <input
                  id="nome" type="text" autoComplete="name"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  onBlur={() => handleBlur('nome')}
                  aria-required="true"
                  aria-invalid={touchedFields.has('nome') && !!errors.nome}
                  aria-describedby={errors.nome ? 'nome-error' : undefined}
                  className={`w-full border-b-2 p-3 text-sm font-medium outline-none transition-colors uppercase placeholder-gray-300 ${
                    touchedFields.has('nome') && errors.nome ? 'border-red-400 bg-red-50' : 'focus:border-[#ff9800] border-gray-200'
                  }`}
                  placeholder={t('fullName')}
                />
                {touchedFields.has('nome') && errors.nome && (
                  <p id="nome-error" role="alert" className="text-red-500 text-[10px] font-bold mt-1 flex items-center gap-1">
                    <svg aria-hidden="true" className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.nome}
                  </p>
                )}
              </div>

              {/* Telemóvel */}
              <div>
                <label htmlFor="telemovel" className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5">
                  {t('phone')} <span className="text-red-500" aria-label="obrigatório">*</span>
                </label>
                <input
                  id="telemovel" type="tel" autoComplete="tel" inputMode="numeric"
                  value={formData.telemovel}
                  onChange={(e) => setFormData({ ...formData, telemovel: e.target.value })}
                  onBlur={() => handleBlur('telemovel')}
                  aria-required="true"
                  aria-invalid={touchedFields.has('telemovel') && !!errors.telemovel}
                  aria-describedby={errors.telemovel ? 'tel-error' : 'tel-hint'}
                  className={`w-full border-b-2 p-3 text-sm font-medium outline-none transition-colors placeholder-gray-300 ${
                    touchedFields.has('telemovel') && errors.telemovel ? 'border-red-400 bg-red-50' : 'focus:border-[#ff9800] border-gray-200'
                  }`}
                  placeholder="84 123 4567"
                />
                {!errors.telemovel && <p id="tel-hint" className="text-[9px] text-gray-400 font-medium mt-1">Ex: 84 123 4567</p>}
                {touchedFields.has('telemovel') && errors.telemovel && (
                  <p id="tel-error" role="alert" className="text-red-500 text-[10px] font-bold mt-1 flex items-center gap-1">
                    <svg aria-hidden="true" className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.telemovel}
                  </p>
                )}
              </div>

              {/* NUIT */}
              <div>
                <label htmlFor="nuit" className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5">
                  {t('nuit')}
                </label>
                <input
                  id="nuit" type="text" inputMode="numeric"
                  value={formData.nuit}
                  onChange={(e) => setFormData({ ...formData, nuit: e.target.value })}
                  className="w-full border-b-2 border-gray-200 p-3 text-sm font-medium outline-none focus:border-[#ff9800] transition-colors placeholder-gray-300"
                  placeholder="123456789"
                />
              </div>

              {/* Endereço */}
              <div className="md:col-span-2">
                <label htmlFor="endereco" className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5">
                  {t('address')} <span className="text-red-500" aria-label="obrigatório">*</span>
                </label>
                <input
                  id="endereco" type="text" autoComplete="street-address"
                  value={formData.endereco}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                  onBlur={() => handleBlur('endereco')}
                  aria-required="true"
                  aria-invalid={touchedFields.has('endereco') && !!errors.endereco}
                  aria-describedby={errors.endereco ? 'end-error' : undefined}
                  className={`w-full border-b-2 p-3 text-sm font-medium outline-none transition-colors uppercase placeholder-gray-300 ${
                    touchedFields.has('endereco') && errors.endereco ? 'border-red-400 bg-red-50' : 'focus:border-[#ff9800] border-gray-200'
                  }`}
                  placeholder="Bairro, Cidade"
                />
                {touchedFields.has('endereco') && errors.endereco && (
                  <p id="end-error" role="alert" className="text-red-500 text-[10px] font-bold mt-1 flex items-center gap-1">
                    <svg aria-hidden="true" className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.endereco}
                  </p>
                )}
              </div>

              {/* Emergência */}
              <div className="md:col-span-2">
                <label htmlFor="emergencia" className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5">
                  {t('emergency')}
                </label>
                <input
                  id="emergencia" type="tel" autoComplete="tel"
                  value={formData.emergencia}
                  onChange={(e) => setFormData({ ...formData, emergencia: e.target.value })}
                  className="w-full border-b-2 border-gray-200 p-3 text-sm font-medium outline-none focus:border-[#ff9800] transition-colors placeholder-gray-300"
                  placeholder="84 987 6543"
                />
              </div>
            </div>

            <p className="text-[9px] text-gray-400 font-medium mt-4 mb-6">
              <span className="text-red-500">*</span> {t('required')}
            </p>

            <button
              type="submit"
              className="w-full bg-[#ff9800] text-white py-4 font-black uppercase text-xs tracking-widest hover:bg-[#004d40] focus:outline-none focus:ring-2 focus:ring-[#ff9800] focus:ring-offset-2 transition-colors rounded-sm"
            >
              {t('continuePayment')}
              <svg aria-hidden="true" className="inline ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </form>
        </div>

      ) : (
        <div className="space-y-6 animate-fadeIn">

          {/* Back to step 1 — Norman: reversible actions */}
          <button
            onClick={() => setStep(1)}
            className="text-[#004d40] font-black uppercase text-[10px] hover:text-[#ff9800] focus:outline-none focus:underline transition-colors flex items-center gap-1"
          >
            ← {t('deliveryDetails')}
          </button>

          {/* Total */}
          <div className="bg-[#004d40] text-white p-8 shadow-xl text-center rounded-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-70">{t('totalToPay')}</p>
            <p className="text-5xl font-black italic" aria-label={`Total: ${cartTotal.toLocaleString()} Meticais`}>
              {cartTotal.toLocaleString()},00 MT
            </p>
          </div>

          {/* Payment methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="group" aria-label="Métodos de pagamento">

            {/* M-PESA */}
            <div className="bg-white border-2 border-gray-100 p-6 rounded-sm text-center hover:border-[#ff9800] transition-colors focus-within:ring-2 focus-within:ring-[#ff9800]">
              <p className="text-2xl text-red-600 font-black italic mb-2" aria-hidden="true">M-PESA</p>
              <p className="text-[10px] font-black uppercase text-gray-400 mb-3">{t('transferTo')}:</p>
              <p className="font-black text-[#004d40] text-lg tracking-wider">84 886 2188</p>
              <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase">Zimpeto Wholesale LDA</p>
            </div>

            {/* BANK */}
            <div className="bg-white border-2 border-gray-100 p-6 rounded-sm text-center hover:border-[#ff9800] transition-colors focus-within:ring-2 focus-within:ring-[#ff9800]">
              <p className="text-2xl text-blue-800 font-black italic mb-2" aria-hidden="true">BANCO</p>
              <p className="text-[10px] font-black uppercase text-gray-400 mb-3">{t('bankNIB')}:</p>
              <p className="font-black text-[#004d40] text-sm tracking-wider">0001 2345 6789 00</p>
              <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase">{t('ref')}: {formData.telemovel}</p>
            </div>

            {/* VISA — unavailable, clearly communicated */}
            <div
              className="bg-gray-50 border-2 border-dashed border-gray-200 p-6 rounded-sm text-center"
              aria-label="Cartão VISA — indisponível de momento"
            >
              <p className="text-2xl text-gray-300 font-black italic mb-2" aria-hidden="true">VISA</p>
              <p className="text-[10px] font-black uppercase text-gray-300 mb-3">Em breve</p>
              <p className="text-[9px] font-bold text-gray-300 uppercase">{t('unavailable')}</p>
            </div>
          </div>

          {/* Important note */}
          <div className="bg-amber-50 border-l-4 border-[#ff9800] p-5 rounded-sm" role="note">
            <h4 className="font-black text-[#004d40] text-xs uppercase mb-2 flex items-center gap-2">
              <svg aria-hidden="true" className="w-4 h-4 text-[#ff9800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t('important')}:
            </h4>
            <p className="text-[11px] font-medium text-gray-600 leading-relaxed">
              {t('paymentNote')}
            </p>
          </div>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/258848862188?text=Comprovativo%20de%20pagamento%20-%20${formData.nome}%20-%20${cartTotal.toLocaleString()}MT`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-4 font-black uppercase text-xs tracking-widest hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors rounded-sm"
          >
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {t('sendProof')}
          </a>

          <button
            onClick={() => router.push('/')}
            className="w-full border-2 border-[#004d40] text-[#004d40] py-4 font-black uppercase text-xs tracking-widest hover:bg-[#004d40] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#004d40] focus:ring-offset-2 transition-colors rounded-sm"
          >
            {t('finish')}
          </button>
        </div>
      )}
    </div>
  );
}
