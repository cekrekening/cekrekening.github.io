import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen w-full">
      <header>
        <Navbar />
      </header>
      <div className="container-flex flex flex-col justify-center overflow-hidden">
        <main className="shrink overflow-hidden 2xl:px-20 xl:px-20 lg:px-20 md:px-20 px-10 py-6">
          <div className="h-screen overflow-y-auto md:px-4">{children}</div>
        </main>
      </div>
      <footer className="w-full flex items-center justify-center gap-1 text-sm">
        <span className="text-default-600">
          &copy; 2024-{new Date().getFullYear()}
        </span>
        <p className="text-primary">CekRekening.</p> -
        <p className={"text-default-600 font-mono code"}>v2.0</p>
      </footer>
    </div>
  );
}
