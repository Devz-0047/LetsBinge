import { MdError } from "react-icons/md";
function NotFound() {
  return (
    <div className="mt-6 flex h-[100vh] items-center justify-center bg-slate-950">
      <div className="flex items-center justify-center gap-2">
        <p className="text-5xl text-orange-600">404: Page Not Found</p>
        <MdError className="text-5xl text-orange-600" />
      </div>
    </div>
  );
}

export default NotFound;
