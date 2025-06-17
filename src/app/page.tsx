import Link from 'next/link';

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
    </div>
  );
}
