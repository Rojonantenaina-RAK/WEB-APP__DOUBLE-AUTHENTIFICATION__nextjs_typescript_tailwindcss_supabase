import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOtpEmail(email: string, code: string) {
  const { error } = await resend.emails.send({
    from: 'onboarding@resend.dev', // test domain
    to: email,
    subject: 'Votre code de connexion',
    html: `
      <h1>Code de vérification</h1>
      <p>Voici votre code : <strong>${code}</strong></p>
      <p>Il expirera dans 10 minutes.</p>
    `,
  });

  if (error) {
    console.error('Erreur envoi email:', error);
    throw new Error('Erreur lors de l’envoi du code');
  }
}
