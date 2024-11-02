import { useAuth } from "../hooks/useAuth";

// import heroSection from "../assets/HeroSection.webp";
function HeroSection() {
  const { data: session } = useAuth();
  const unAuthMessage = "Welcome to Let'sBinge, Register Now!";
  const authMessage = `Welcome back, ${session?.user?.user_metadata?.name?.split(" ")[0]}`;
  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <div className="absolute inset-0 bg-heroSection bg-cover bg-center bg-no-repeat opacity-75"></div>
      <h2 className="relative z-10 text-6xl text-orange-600">
        {session ? authMessage : unAuthMessage}
      </h2>
    </div>
  );
}

export default HeroSection;
// bg-heroSection flex h-full w-full items-center justify-center
{
  /* <div className="flex items-center justify-center w-screen h-screen bg-center bg-no-repeat bg-cover bg-heroSection">
      <p className="text-3xl text-orange-600">
        Welcome to letsbinge, Register Now
      </p>
    </div> */
}
