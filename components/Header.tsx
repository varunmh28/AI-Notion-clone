'use client';
import {  useUser } from '@clerk/nextjs';
import { Show, SignInButton, UserButton } from "@clerk/nextjs";

function Header() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null; // prevents hydration mismatch / flicker

  return (
    <div className="flex items-center justify-between p-5">
      {user && (
        <h1 className="text-2xl">
          {user.firstName}'s Space
        </h1>
      )}

      {/* Auth Controls */}
      <div>
      <Show when="signed-out">
         <SignInButton />
           </Show>
        <Show when="signed-in">
             <UserButton />
                   </Show>
      </div>
    </div>
  );
}

export default Header;