'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import Illustration from './../../assets/Illustration.webp';

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
        setError(data.error || "Erreur lors de l'envoi du code");
        return;
      }

      router.push('/verify');
    } catch (err) {
      console.error('Erreur OTP :', err);
      setError('Erreur réseau');
    }
  };

  return (
    <div className="flex flex-col-reverse gap-[1rem] sm:flex-row p-7 sm:h-[100vh]">
      <div className="sm:w-[50vw] sm:flex sm:justify-center sm:items-center">
        <form onSubmit={handleLogin} className="max-w-100">
          <p className="text-xl font-bold my-5">Bienvenue !</p>
          <p className="pb-5">
            Aujourd&rsquo;hui est un nouveau jour. C&rsquo;est ton jour.
            C&rsquo;est toi qui le façonnes. <br />
            Connecte-toi pour commencer.
          </p>

          <div className="">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="exemple@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          <div className="my-5">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              placeholder="Au moins 8 caractères"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded w-full mt-2"
          >
            Se connecter
          </button>

          <br />
          <br />
          <hr className="text-gray-200" />
          <br />

          <p>
            Vous n&rsquo;avez pas encore de compte ?{' '}
            <Link href="/register" className="text-blue-600 hover:underline">
              Créer un compte
            </Link>
          </p>
        </form>
      </div>
      <div className="image rounded-2xl sm:w-[50vw] h-[15vh] sm:h-[100%]">
        <Image
          className="rounded-2xl h-[100%] object-cover"
          src={Illustration}
          alt="Illustration"
        />
      </div>
    </div>
  );
}
