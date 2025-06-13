import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <header className="bg-white shadow p-4">
        <h1 className="text-xl font-bold">AI Learning Platform</h1>
      </header>
      <main className="p-6 max-w-4xl mx-auto">{children}</main>
    </div>
  );
}
