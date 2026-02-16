import { Sidebar } from "@/components/Sidebar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-white antialiased">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 ml-64 p-10 min-h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}