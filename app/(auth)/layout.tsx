export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      style={{
        backgroundImage: 'url("/img/login-bg.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container py-4 min-h-screen flex items-center justify-center">
        {children}
      </div>
    </main>
  );
}
