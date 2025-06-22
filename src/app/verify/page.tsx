'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function VerifyPage() {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('otp_codes')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .gt('expires_at', new Date().toISOString());

    if (error || !data || data.length === 0) {
      setError('Code invalide ou expiré.');
      return;
    }

    await supabase.from('otp_codes').delete().eq('id', data[0].id);

    sessionStorage.setItem('2faVerified', 'true');
    router.push('/dashboard');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-6">
      <form
        onSubmit={handleVerify}
        className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow p-6"
      >
        <h1 className="text-xl font-bold mb-5 text-center">Vérification 2FA</h1>

        <p className="pb-4 text-center text-sm text-gray-600">
          Un code à usage unique vous a été envoyé par email. Veuillez entrer
          votre adresse email et le code reçu.
        </p>

        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="code">Code à 6 chiffres</label>
          <input
            type="text"
            id="code"
            placeholder="123456"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded w-full mt-2"
        >
          Vérifier
        </button>
      </form>
    </div>
  );
}
