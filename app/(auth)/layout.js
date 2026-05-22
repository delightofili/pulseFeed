export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-purple-600 flex items-center flex-col justify-center">
      {children}
    </div>
  );
}
