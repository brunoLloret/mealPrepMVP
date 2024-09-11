import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import Front from "../src/components/pages/Front";

const App = () => {
  return (
    <>
      <div className="bg-sky-500 w-full min-h-screen">
        <header className="text-white">
          {/* <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn> */}
        </header>
        <div>
          <Front />
        </div>
      </div>
    </>
  );
};

export default App;
