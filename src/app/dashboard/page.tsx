'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Home, User, BookOpen, LogOut } from 'lucide-react'; // Icônes

export default function Dashboard() {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verified = sessionStorage.getItem('2faVerified');
    if (verified === 'true') {
      setIsVerified(true);
    } else {
      router.push('/login');
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('2faVerified');
    router.push('/login');
  };

  if (!isVerified) return null;

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-20 sm:w-64 bg-white border-r p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-8 hidden sm:block">
            📘FrancoApp
          </h1>

          <nav className="space-y-6">
            <button className="flex items-center gap-3 text-gray-700 hover:text-black">
              <Home size={20} />
              <span className="hidden sm:inline">Accueil</span>
            </button>
            <button className="flex items-center gap-3 text-gray-700 hover:text-black">
              <User size={20} />
              <span className="hidden sm:inline">Profil</span>
            </button>
            <button className="flex items-center gap-3 text-gray-700 hover:text-black">
              <BookOpen size={20} />
              <span className="hidden sm:inline">Cours</span>
            </button>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-500 hover:text-red-600 mt-6"
        >
          <LogOut size={20} />
          <span className="hidden sm:inline">Se déconnecter</span>
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold">Bienvenue 👋</h2>
          <p className="text-gray-600">
            Tu es connecté. Commence ton apprentissage du français maintenant !
          </p>

          {/* Section "posts" façon feed */}
          <div className="grid gap-4">
            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-semibold mb-2">📚 Leçon 1 : Salutations</h3>
              <p className="text-gray-600 text-sm">
                Apprends à dire bonjour, au revoir, comment ça va…
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-semibold mb-2">🗣️ Expression orale</h3>
              <p className="text-gray-600 text-sm">
                Écoute et répète les phrases courantes avec un accent correct.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-semibold mb-2">📖 Vocabulaire quotidien</h3>
              <p className="text-gray-600 text-sm">
                Mémorise les mots de base utilisés tous les jours.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
