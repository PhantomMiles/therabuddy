import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-10">
      
      <Image
        src="/therabuddy.png"
        alt="Therabuddy Logo"
        width={120}
        height={120}
      />

      <h1 className="text-4xl font-bold text-center">
        Welcome to Therabuddy
      </h1>

      <p className="text-lg text-center max-w-xl text-gray-500">
        Your AI companion for mental wellness. Talk, reflect, and grow with a
        supportive AI therapist anytime you need.
      </p>

      <div className="flex gap-4">
        <Link
          href="/login/page.tsx"
          className="rounded-full bg-black px-6 py-3 text-white hover:opacity-80"
        >
          Login
        </Link>

        <Link
          href="/signup/page.tsx"
          className="rounded-full border px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Sign Up
        </Link>
      </div>
    </main>
  );
}