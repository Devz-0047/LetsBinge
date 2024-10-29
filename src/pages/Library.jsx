import { useAuth } from "../hooks/useAuth";

import Spinner from "../ui/Spinner";
import Login from "./Login";

function Library() {
  const { data: session, isLoading: isSessionLoading } = useAuth();

  const firstName = session?.user?.user_metadata?.name?.split(" ")[0];
  const avatarUrl = session?.user?.user_metadata?.avatar_url;
  if (isSessionLoading)
    return (
      <div className="min-h-screen items-center justify-center bg-stone-900">
        <Spinner />
      </div>
    );
  return (
    <div className="z-50 flex min-h-screen items-center justify-center bg-stone-900">
      {!session ? (
        <Login />
      ) : (
        <p className="text-xl text-orange-500">Welcome, {firstName}</p>
      )}
    </div>
  );
}

export default Library;
