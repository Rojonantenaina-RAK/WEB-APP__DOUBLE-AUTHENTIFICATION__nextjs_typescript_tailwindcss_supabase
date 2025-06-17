// src/app/logout/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut();
      sessionStorage.clear();
      router.push('/login');
    };

    logout();
  }, [router]);

  return <p>Déconnexion en cours...</p>;
}
