'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError('Email ou mot de passe invalide');
      return;
    }

    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erreur envoi code');
        return;
      }

      router.push('/verify');
    } catch (err) {
      console.error('Erreur OTP:', err);
      setError('Erreur réseau');
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-4 max-w-sm mx-auto space-y-4">
      <h1 className="text-xl font-bold">Connexion</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />

      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Se connecter
      </button>
    </form>
  );
}
