import { NextResponse } from 'next/server';
import { createHash, randomInt } from 'crypto';
import { createAdminClient } from '../../../lib/supabase/admin';

export const runtime = 'nodejs';

const OTP_TTL_MINUTES = 10;

function hashCode(email: string, code: string) {
  // Bind the hash to the email so a hash can't be reused for another address.
  return createHash('sha256').update(`${email.toLowerCase()}:${code}`).digest('hex');
}

async function sendEmail(email: string, code: string) {
  const apiKey = process.env.RESEND_API_KEY;
  // If no Resend key is configured, skip sending. The OTP is still stored in the DB.
  if (!apiKey) {
    console.log('[v0] RESEND_API_KEY not set — OTP stored in DB but email not sent.');
    return { sent: false };
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Mercado do Zimpeto <onboarding@resend.dev>',
      to: [email],
      subject: 'O seu código de verificação',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #004d40;">Código de Verificação</h2>
          <p>Use o seguinte código para confirmar o seu email:</p>
          <p style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #ff9800;">${code}</p>
          <p style="color: #888; font-size: 13px;">Este código expira em ${OTP_TTL_MINUTES} minutos.</p>
        </div>
      `,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.log('[v0] Resend send failed:', detail);
    return { sent: false, error: 'email_failed' };
  }
  return { sent: true };
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email inválido.' }, { status: 400 });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const code = String(randomInt(0, 1_000_000)).padStart(6, '0');
    const codeHash = hashCode(normalizedEmail, code);
    const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000).toISOString();

    const supabase = createAdminClient();

    // Invalidate any previous unconsumed OTPs for this email.
    await supabase
      .from('email_otps')
      .update({ consumed_at: new Date().toISOString() })
      .eq('email', normalizedEmail)
      .is('consumed_at', null);

    const { error: insertError } = await supabase.from('email_otps').insert({
      email: normalizedEmail,
      code_hash: codeHash,
      expires_at: expiresAt,
    });

    if (insertError) {
      console.log('[v0] Failed to store OTP:', insertError.message);
      return NextResponse.json({ error: 'Não foi possível gerar o código.' }, { status: 500 });
    }

    const emailResult = await sendEmail(normalizedEmail, code);

    return NextResponse.json({ ok: true, emailSent: emailResult.sent });
  } catch (err) {
    console.log('[v0] send-otp route error:', err);
    return NextResponse.json({ error: 'Erro inesperado.' }, { status: 500 });
  }
}
