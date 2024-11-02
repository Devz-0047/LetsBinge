import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

import Spinner from "../ui/Spinner";
import Login from "./Login";
import { useEffect } from "react";
import LibraryContent from "../ui/LibraryContent";

function Library() {
  const { data: session, isLoading: isSessionLoading } = useAuth();

  const firstName = session?.user?.user_metadata?.name?.split(" ")[0];
  useEffect(() => {
    if (!session && !isSessionLoading) {
      toast("To use the Library feature you need to Login", {
        duration: 3000,
      });
    }
  }, [session, isSessionLoading]);
  // const avatarUrl = session?.user?.user_metadata?.avatar_url;
  if (isSessionLoading)
    return (
      <div className="min-h-screen items-center justify-center bg-stone-900">
        <Spinner />
      </div>
    );
  return (
    <div>
      {!session ? (
        <div className="z-50 flex min-h-screen items-center justify-center bg-stone-900">
          <Login />
        </div>
      ) : (
        <div className="min-h-screen bg-stone-900 pl-2 pt-[7rem]">
          <p className="text-center text-4xl font-semibold text-orange-600">
            Welcome to Library, {firstName}
          </p>
          <LibraryContent />
        </div>
      )}
    </div>
  );
}

export default Library;
