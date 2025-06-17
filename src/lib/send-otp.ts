import { supabase } from './supabase';
import { sendOtpEmail } from './send-email';

export async function sendOtpCode(email: string) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  const { error } = await supabase.from('otp_codes').insert({
    email,
    code,
    expires_at: expiresAt.toISOString(),
  });

  if (error) throw new Error('Erreur enregistrement code OTP');

  // ✅ Envoi réel du code
  await sendOtpEmail(email, code);
}
