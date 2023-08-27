import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5 bg-neutral-800 lg:p-24">
      <Link href={"/"} className="font-sans font-bold text-violet-200">
        Home
      </Link>
    </main>
  )
}
