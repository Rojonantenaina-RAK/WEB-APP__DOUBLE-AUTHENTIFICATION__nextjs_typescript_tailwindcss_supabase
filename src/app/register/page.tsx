'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Illustration from './../../assets/Illustration.webp';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
    } else {
      router.push('/login');
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col-reverse gap-[1rem] sm:flex-row p-7 sm:h-[100vh]">
      <div className="sm:w-[50vw] sm:flex sm:justify-center sm:items-center">
        <form onSubmit={handleRegister} className="max-w-100 w-full">
          <p className="text-xl font-bold my-5">Créer un compte</p>
          <p className="pb-5">
            Rejoins-nous dès aujourd'hui. <br />
            Inscris-toi pour accéder aux cours.
          </p>

          <div className="mb-4">
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

          <div className="mb-4">
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
            disabled={loading}
          >
            {loading ? 'Chargement...' : "S'inscrire"}
          </button>

          <br />
          <br />
          <hr className="text-gray-200" />
          <br />
          <p>
            Vous avez déjà un compte ?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Se connecter
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
