import CalcForm from "./components/CalcForm";
import PanelLayout from "./components/PanelLayout";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5 bg-neutral-800 lg:p-24">
      <h1 className="my-14 text-center text-3xl font-bold uppercase tracking-widest text-violet-200">
        Star Rail Damage Calculator
      </h1>

      <PanelLayout>
        <CalcForm/>
      </PanelLayout>
    </main>
  )
}
