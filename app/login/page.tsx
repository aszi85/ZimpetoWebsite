'use client';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function LoginPage() {
  const { t } = useCart();
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ login: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.login || !form.password) {
      setError('Por favor preencha todos os campos.');
      return;
    }
    setError('');
    // Simulate login — replace with real auth
    alert('Funcionalidade de login em desenvolvimento.');
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="bg-white border border-gray-100 p-10 shadow-lg rounded-sm">
          {/* Header */}
          <div className="text-center mb-10">
            <p className="font-black text-2xl italic text-[#004d40] tracking-tighter mb-1">ZIMPETO</p>
            <h1 className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">{t('loginTagline')}</h1>
          </div>

          {/* Error */}
          {error && (
            <div role="alert" className="bg-red-50 border-l-4 border-red-400 p-3 mb-6 rounded-sm">
              <p className="text-red-600 text-[11px] font-bold">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate aria-label={t('login')}>
            <div className="space-y-6">
              <div>
                <label htmlFor="login-input" className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                  {t('emailPhone')}
                </label>
                <input
                  id="login-input"
                  type="text"
                  autoComplete="username"
                  value={form.login}
                  onChange={(e) => setForm({ ...form, login: e.target.value })}
                  placeholder="840000000 ou email@exemplo.com"
                  aria-required="true"
                  className="w-full border-b-2 border-gray-200 py-3 text-sm font-bold focus:outline-none focus:border-[#ff9800] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="password-input" className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                  {t('password')}
                </label>
                <div className="relative">
                  <input
                    id="password-input"
                    type={showPass ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••••"
                    aria-required="true"
                    className="w-full border-b-2 border-gray-200 py-3 text-sm font-bold focus:outline-none focus:border-[#ff9800] transition-colors pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-[#004d40] focus:outline-none focus:ring-2 focus:ring-[#ff9800] rounded transition-colors"
                    aria-label={showPass ? 'Ocultar palavra-passe' : 'Mostrar palavra-passe'}
                    aria-pressed={showPass}
                  >
                    {showPass ? (
                      <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-8 bg-[#004d40] text-white py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#ff9800] focus:outline-none focus:ring-2 focus:ring-[#ff9800] focus:ring-offset-2 transition-all rounded-sm"
            >
              {t('loginBtn')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="#"
              className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-[#004d40] focus:outline-none focus:underline transition-colors"
            >
              {t('forgotPass')}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
