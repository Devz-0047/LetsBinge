// import heroSection from "../assets/HeroSection.webp";
function HeroSection() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <div className="bg-heroSection absolute inset-0 bg-cover bg-center bg-no-repeat opacity-75"></div>
      <p className="relative z-10 text-3xl text-orange-600">
        Welcome to letsbinge, Register Now
      </p>
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
