import { useAuth } from "../hooks/useAuth";

// import heroSection from "../assets/HeroSection.webp";
function HeroSection() {
  const { data: session } = useAuth();
  const unAuthMessage = "Welcome to Let'sBinge, Register Now!";
  const authMessage = `Welcome back, ${session?.user?.user_metadata?.name?.split(" ")[0]}`;
  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <div className="absolute inset-0 bg-heroSection bg-cover bg-center bg-no-repeat opacity-75"></div>
      <h2 className="relative z-10 p-4 text-center text-3xl font-bold text-orange-600 md:text-6xl">
        {session ? authMessage : unAuthMessage}
      </h2>
    </div>
  );
}

export default HeroSection;
