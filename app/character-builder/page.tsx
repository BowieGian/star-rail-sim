import Link from "next/link";
import PanelLayout from "../components/PanelLayout";
import Yanqing from "../entities/characters/Yanqing";

export default function Page() {
  let yanqing: Yanqing = new Yanqing("Yanqing", 40);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5 bg-neutral-800 lg:p-24">
      <Link href={"/"} className="font-sans font-bold text-purple-200">
        Back To Home
      </Link>

      <PanelLayout>
        <div className="font-sans font-bold text-purple-200">
          {yanqing.name} Base Stats<br/>
          HP: {yanqing.hpBase} <br/>
          ATK: {yanqing.atkBase} <br/>
          DEF: {yanqing.defBase} <br/>
          SPD: {yanqing.spdBase}
        </div>
      </PanelLayout>
    </main>
  )
}