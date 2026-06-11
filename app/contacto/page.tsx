'use client';
import { useState, useRef } from 'react';
import { useCart } from '../context/CartContext';

type Step = 'form' | 'otp' | 'done';

export default function ContactoPage() {
  const { t } = useCart();

  const [step, setStep] = useState<Step>('form');
  const [form, setForm] = useState({ nome: '', email: '', mensagem: '' });
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  // Track when the visitor landed on the page to compute session time.
  const startedAt = useRef<number>(Date.now());

  // Collect lightweight visitor metadata available client-side.
  const collectVisitorMeta = () => {
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    let browser = 'Desconhecido';
    if (/Edg\//.test(ua)) browser = 'Edge';
    else if (/OPR\/|Opera/.test(ua)) browser = 'Opera';
    else if (/SamsungBrowser/.test(ua)) browser = 'Samsung Internet';
    else if (/Firefox\//.test(ua)) browser = 'Firefox';
    else if (/Chrome\//.test(ua)) browser = 'Chrome';
    else if (/Safari\//.test(ua)) browser = 'Safari';

    const location =
      typeof Intl !== 'undefined'
        ? Intl.DateTimeFormat().resolvedOptions().timeZone || 'Desconhecido'
        : 'Desconhecido';

    const sessionSeconds = Math.max(1, Math.round((Date.now() - startedAt.current) / 1000));

    return {
      browser: `${browser} (${ua.slice(0, 80)})`,
      location,
      phone_spec: ua,
      session_time_seconds: sessionSeconds,
    };
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!form.nome.trim()) errs.nome = 'Nome é obrigatório';
    if (!form.email.trim()) errs.email = 'Email é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Email inválido';
    if (!form.mensagem.trim()) errs.mensagem = 'Mensagem é obrigatória';
    return errs;
  };

  // Step 1: send the OTP code to the provided email.
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    const errs = validateForm();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email }),
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        setServerError(data.error ?? 'Não foi possível enviar o código.');
        return;
      }
      setStep('otp');
    } catch {
      setLoading(false);
      setServerError('Erro de ligação. Tente novamente.');
    }
  };

  // Step 2: verify the OTP and, on success, store the visitor record.
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    if (otp.trim().length < 6) {
      setServerError('Introduza o código de 6 dígitos.');
      return;
    }
    setLoading(true);

    const { error: verifyError } = await supabase.auth.verifyOtp({
      email: form.email,
      token: otp.trim(),
      type: 'email',
    });

    if (verifyError) {
      setLoading(false);
      setServerError('Código inválido ou expirado. Tente novamente.');
      return;
    }

    const meta = collectVisitorMeta();
    const { error: insertError } = await supabase.from('visitors').insert({
      visitor_name: form.nome,
      email: form.email,
      location: meta.location,
      browser: meta.browser,
      session_time_seconds: meta.session_time_seconds,
      phone_spec: meta.phone_spec,
    });

    setLoading(false);
    if (insertError) {
      setServerError('Não foi possível guardar os seus dados. Tente novamente.');
      return;
    }
    setStep('done');
  };

  const handleResend = async () => {
    setServerError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: form.email,
      options: { shouldCreateUser: true },
    });
    setLoading(false);
    if (error) setServerError(error.message);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 md:px-6 py-16">
      <div className="mb-12">
        <h1 className="text-3xl font-black text-[#004d40] uppercase tracking-tighter border-l-4 border-[#ff9800] pl-4">
          {t('contactsTitle')}
        </h1>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-2 pl-5">
          {t('contactsTagline')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact info — Gestalt: proximity groups each contact type */}
        <section aria-label="Informações de contacto">
          <div className="space-y-8">
            {[
              {
                icon: (
                  <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                label: t('location2'),
                value: t('locationValue'),
                href: 'https://maps.google.com/?q=Mercado+do+Zimpeto+Maputo',
                linkLabel: 'Ver no mapa',
              },
              {
                icon: (
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a9.956 9.956 0 00-5.031-1.378c-5.452.001-9.887 4.436-9.887 9.885 0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893 0-3.181-1.237-6.167-3.48-8.413A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892z"/>
                  </svg>
                ),
                label: t('whatsapp'),
                value: '+258 84 123 4567',
                href: 'https://wa.me/258841234567',
                linkLabel: 'Iniciar conversa',
              },
              {
                icon: (
                  <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                label: 'Horário',
                value: 'Seg–Sáb: 06:00 – 18:00',
                href: null,
                linkLabel: null,
              },
            ].map((item) => (
              <div key={item.label} className="flex gap-4">
                <div className="w-10 h-10 bg-[#004d40] text-white rounded-sm flex items-center justify-center shrink-0" aria-hidden="true">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-black uppercase text-[10px] tracking-widest text-[#ff9800] mb-1">{item.label}</h3>
                  <p className="text-sm font-bold text-gray-700">{item.value}</p>
                  {item.href && (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-black text-[#004d40] uppercase tracking-wide hover:text-[#ff9800] focus:outline-none focus:underline transition-colors"
                    >
                      {item.linkLabel} →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact form */}
        <section aria-label="Formulário de contacto">
          {step === 'done' ? (
            <div className="bg-[#004d40] text-white p-10 rounded-sm text-center" role="status" aria-live="polite">
              <svg aria-hidden="true" className="w-12 h-12 text-[#ff9800] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-black uppercase text-lg mb-2">Email Verificado!</h3>
              <p className="text-[11px] font-medium opacity-70">A sua mensagem foi recebida. Responderemos em breve via WhatsApp ou email.</p>
            </div>
          ) : step === 'otp' ? (
            <form
              onSubmit={handleVerifyOtp}
              noValidate
              className="space-y-5 bg-white p-8 border border-gray-100 shadow-sm rounded-sm"
              aria-label="Verificar código"
            >
              <h2 className="font-black uppercase text-[11px] tracking-widest text-[#004d40] mb-1">Verificar Email</h2>
              <p className="text-[11px] font-medium text-gray-500 leading-relaxed">
                Enviámos um código de 6 dígitos para <span className="font-bold text-gray-700">{form.email}</span>. Introduza-o abaixo para confirmar.
              </p>

              <div>
                <label htmlFor="otp" className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5">
                  Código de verificação <span className="text-red-500" aria-label="obrigatório">*</span>
                </label>
                <input
                  id="otp"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => { setOtp(e.target.value.replace(/\D/g, '')); setServerError(''); }}
                  aria-required="true"
                  className="w-full border-b-2 py-3 text-lg font-bold tracking-[0.5em] text-center focus:outline-none transition-colors border-gray-200 focus:border-[#ff9800]"
                />
              </div>

              {serverError && (
                <p role="alert" className="text-red-500 text-[10px] font-bold">{serverError}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#004d40] text-white py-4 font-black uppercase text-[10px] tracking-widest hover:bg-[#ff9800] focus:outline-none focus:ring-2 focus:ring-[#ff9800] focus:ring-offset-2 transition-colors rounded-sm disabled:opacity-50"
              >
                {loading ? 'A verificar…' : 'Confirmar e Enviar'}
              </button>

              <button
                type="button"
                onClick={handleResend}
                disabled={loading}
                className="w-full text-[10px] font-black text-[#004d40] uppercase tracking-widest hover:text-[#ff9800] focus:outline-none focus:underline transition-colors disabled:opacity-50"
              >
                Reenviar código
              </button>
            </form>
          ) : (
            <form
              onSubmit={handleSendOtp}
              noValidate
              className="space-y-5 bg-white p-8 border border-gray-100 shadow-sm rounded-sm"
              aria-label="Enviar mensagem"
            >
              <h2 className="font-black uppercase text-[11px] tracking-widest text-[#004d40] mb-5">Enviar Mensagem</h2>

              {[
                { id: 'nome', label: t('name'), type: 'text', required: true, autoComplete: 'name', placeholder: 'José Maluleque' },
                { id: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email', placeholder: 'jose@exemplo.co.mz' },
              ].map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5">
                    {field.label} {field.required && <span className="text-red-500" aria-label="obrigatório">*</span>}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    placeholder={field.placeholder}
                    value={(form as any)[field.id]}
                    onChange={(e) => { setForm({ ...form, [field.id]: e.target.value }); setErrors({ ...errors, [field.id]: '' }); }}
                    aria-required={field.required}
                    aria-invalid={!!errors[field.id]}
                    aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
                    className={`w-full border-b-2 py-3 text-sm font-medium focus:outline-none transition-colors ${
                      errors[field.id] ? 'border-red-400' : 'border-gray-200 focus:border-[#ff9800]'
                    }`}
                  />
                  {errors[field.id] && (
                    <p id={`${field.id}-error`} role="alert" className="text-red-500 text-[10px] font-bold mt-1">{errors[field.id]}</p>
                  )}
                </div>
              ))}

              <div>
                <label htmlFor="mensagem" className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5">
                  {t('message')} <span className="text-red-500" aria-label="obrigatório">*</span>
                </label>
                <textarea
                  id="mensagem"
                  rows={4}
                  placeholder="A sua mensagem..."
                  value={form.mensagem}
                  onChange={(e) => { setForm({ ...form, mensagem: e.target.value }); setErrors({ ...errors, mensagem: '' }); }}
                  aria-required="true"
                  aria-invalid={!!errors.mensagem}
                  className={`w-full border-b-2 py-3 text-sm font-medium focus:outline-none transition-colors resize-none ${
                    errors.mensagem ? 'border-red-400' : 'border-gray-200 focus:border-[#ff9800]'
                  }`}
                />
                {errors.mensagem && (
                  <p role="alert" className="text-red-500 text-[10px] font-bold mt-1">{errors.mensagem}</p>
                )}
              </div>

              {serverError && (
                <p role="alert" className="text-red-500 text-[10px] font-bold">{serverError}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#004d40] text-white py-4 font-black uppercase text-[10px] tracking-widest hover:bg-[#ff9800] focus:outline-none focus:ring-2 focus:ring-[#ff9800] focus:ring-offset-2 transition-colors rounded-sm disabled:opacity-50"
              >
                {loading ? 'A enviar código…' : 'Verificar Email e Enviar'}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
