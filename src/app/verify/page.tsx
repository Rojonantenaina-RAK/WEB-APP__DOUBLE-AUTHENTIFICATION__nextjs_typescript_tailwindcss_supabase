// app/verify/page.tsx
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

    // Suppression du code utilisé (sécurité)
    await supabase.from('otp_codes').delete().eq('id', data[0].id);

    sessionStorage.setItem('2faVerified', 'true');
    router.push('/dashboard');
  };

  return (
    <form onSubmit={handleVerify} className="p-4 max-w-sm mx-auto space-y-4">
      <h1 className="text-xl font-bold">Vérification 2FA</h1>

      <input
        type="email"
        placeholder="Votre email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Code à 6 chiffres"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Vérifier
      </button>
    </form>
  );
}
