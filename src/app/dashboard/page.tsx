'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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

  if (!isVerified) {
    return null; // ou afficher un spinner
  }

  return (
    <div className="p-4 space-y-4">
      <p>
        ✅ Bienvenue sur le Dashboard ! Authentification à deux facteurs
        réussie.
      </p>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Se déconnecter
      </button>
    </div>
  );
}
