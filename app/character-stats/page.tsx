import Link from "next/link";
import PanelLayout from "../components/PanelLayout";
import CharacterForm from "../components/CharacterForm";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5 bg-neutral-800 lg:p-24">
      <h1 className="my-14 lg:mt-0 text-center text-3xl font-bold uppercase tracking-widest text-purple-200">
        Star Rail Character Stats
      </h1>

      <Link href={"/"} className="font-sans font-bold text-purple-200">
        Back To Home
      </Link>

      <PanelLayout>
        <CharacterForm/>
      </PanelLayout>
    </main>
  )
}
