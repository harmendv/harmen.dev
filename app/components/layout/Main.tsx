export function Main({ children }: any) {
  return (
    <main className="container mx-auto max-w-5xl px-6 pb-8 pt-10 sm:px-9 sm:pt-12 flex flex-col w-full">
      {children}
    </main>
  );
}
