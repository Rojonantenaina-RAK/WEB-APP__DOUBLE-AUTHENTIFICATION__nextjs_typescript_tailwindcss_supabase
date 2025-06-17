'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const isVerified = sessionStorage.getItem('2faVerified');
  useEffect(() => {
    if (isVerified !== 'true') {
      router.push('/login');
    }
  }, []);

  return (
    <div>
      {isVerified && (
        <>
          <p>Salut . Dashboard c est ici. Authentification reussi</p>
          <Link
            className="border bg-red-400 text-white p-2 rounded"
            href="/dashboard/logout"
          >
            Deconnexion
          </Link>
        </>
      )}
    </div>
  );
}
