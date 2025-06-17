import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex justify-evenly mt-[45vh] font-[family-name:var(--font-geist-sans)]">
      <Link
        className="bg-green-500 text-white p-3 rounded w-30 text-center"
        href="/login"
      >
        Login
      </Link>
      <Link
        className="bg-blue-500 text-white p-3 rounded w-30 text-center"
        href="/register"
      >
        Register
      </Link>
    </div>
  );
}
