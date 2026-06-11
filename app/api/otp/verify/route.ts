import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { createAdminClient } from '../../../lib/supabase/admin';

export const runtime = 'nodejs';

const MAX_ATTEMPTS = 5;

function hashCode(email: string, code: string) {
  return createHash('sha256').update(`${email.toLowerCase()}:${code}`).digest('hex');
}

export async function POST(request: Request) {
  try {
    const { email, code, visitor } = await request.json();

    if (!email || !code) {
      return NextResponse.json({ error: 'Dados em falta.' }, { status: 400 });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const supabase = createAdminClient();

    // Find the most recent unconsumed OTP for this email.
    const { data: otpRow, error: fetchError } = await supabase
      .from('email_otps')
      .select('*')
      .eq('email', normalizedEmail)
      .is('consumed_at', null)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (fetchError || !otpRow) {
      return NextResponse.json({ error: 'Nenhum código ativo. Solicite um novo.' }, { status: 400 });
    }

    if (new Date(otpRow.expires_at).getTime() < Date.now()) {
      await supabase.from('email_otps').update({ consumed_at: new Date().toISOString() }).eq('id', otpRow.id);
      return NextResponse.json({ error: 'O código expirou. Solicite um novo.' }, { status: 400 });
    }

    if (otpRow.attempts >= MAX_ATTEMPTS) {
      await supabase.from('email_otps').update({ consumed_at: new Date().toISOString() }).eq('id', otpRow.id);
      return NextResponse.json({ error: 'Demasiadas tentativas. Solicite um novo código.' }, { status: 429 });
    }

    const matches = hashCode(normalizedEmail, String(code).trim()) === otpRow.code_hash;

    if (!matches) {
      await supabase
        .from('email_otps')
        .update({ attempts: otpRow.attempts + 1 })
        .eq('id', otpRow.id);
      return NextResponse.json({ error: 'Código inválido.' }, { status: 400 });
    }

    // Mark OTP as consumed.
    await supabase.from('email_otps').update({ consumed_at: new Date().toISOString() }).eq('id', otpRow.id);

    // Store the verified visitor record.
    if (visitor) {
      const { error: insertError } = await supabase.from('visitors').insert({
        visitor_name: visitor.nome ?? 'Visitante',
        email: normalizedEmail,
        location: visitor.location ?? 'Desconhecido',
        browser: visitor.browser ?? 'Desconhecido',
        session_time_seconds: visitor.session_time_seconds ?? 1,
        phone_spec: visitor.phone_spec ?? 'Desconhecido',
      });

      if (insertError) {
        console.log('[v0] Failed to store visitor:', insertError.message);
        return NextResponse.json({ error: 'Verificado, mas falha ao guardar dados.' }, { status: 500 });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.log('[v0] verify-otp route error:', err);
    return NextResponse.json({ error: 'Erro inesperado.' }, { status: 500 });
  }
}
