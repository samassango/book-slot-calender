import LandingPage from "@/components/landingPage/LandingPage";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-10 items-center">
        <LandingPage/>
      </div>
    </main>
  );
}
