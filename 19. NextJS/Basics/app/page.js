import Link from "next/link";
import Header from '@/components/header.js'; // @ is a NextJs Alias for root project (jsconfig.json is the config file)

// This is a server component, this means the component is render in the server
export default function Home() {
  return (
    <main>
      <Header />
      <p>🔥 Let&apos;s get started! 🔥</p>
      <p><Link href="/about">About Us</Link></p>
    </main>
  );
}
