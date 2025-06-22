import Link from 'next/link';
import Image from 'next/image';
import Logo from '../assets/Logo.jpg';
import styles from './Landing.module.css';
import Etudiant from '../assets/Etudiant.png';

export default function Home() {
  return (
    <div className={`${styles.accueil} h-[100vh]`}>
      <nav className="flex justify-between items-center py-2 px-10 md:px-25">
        <div className="logo">
          <Link
            href="/"
            className="flex justify-center items-center text-white"
          >
            <Image
              src={Logo}
              alt="Logo"
              width={60}
              height={60}
              className="rounded-full"
            />
            | RMF
          </Link>
        </div>
        <div className="flex gap-3">
          <Link
            className="text-white font-bold flex justify-center items-center rounded w-30 h-11 text-center border-2 hover:scale-110 transition-transform duration-300 ease-in-out"
            href="/register"
          >
            Register
          </Link>
          <Link
            className="bg-white text-black font-bold flex justify-center items-center rounded w-30 h-11 text-center hover:scale-110 transition-transform duration-300 ease-in-out"
            href="/login"
          >
            Login
          </Link>
        </div>
      </nav>

      <div className="flex justify-center items-center h-[70vh] flex-col sm:flex-row px-10 md:px-25">
        <div className="flex flex-col gap-10 content text-white">
          <p className="font-bold text-3xl">
            Avec{' '}
            <span className="text-[#FFBA1A]">Cours de Français avec RMF</span>
            <br />
            raffiner votre maîtrise de la langue française ✨
          </p>
          <p className="text-xl">
            Améliorer votre vie personnelle et professionnelle
          </p>
          <Link
            href="/login"
            className="flex justify-center items-center text-black bg-white font-bold rounded p-2 w-40 h-12  hover:scale-110 transition-transform duration-300 ease-in-out"
          >
            Commencer
          </Link>
        </div>
        <div className="image">
          <Image src={Etudiant} alt="Image etudiant" width={300} />
        </div>
      </div>
    </div>
  );
}
