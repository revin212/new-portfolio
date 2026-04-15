export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-on-surface px-8 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-headline font-extrabold tracking-tight">
          Page not found
        </h1>
        <p className="mt-4 text-on-surface-variant">
          The profile URL you opened doesn’t exist.
        </p>
      </div>
    </main>
  );
}

