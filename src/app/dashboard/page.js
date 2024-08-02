'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const Router = useRouter();
  const { data: session, status } = useSession();


  console.log(session,"session")


  useEffect (()=>{
    if(!session)
    {
        Router.push("/");
    }

  })



  if (!session) {
    return (
      <div>
        <p>You are not signed in</p>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div>
      <p>Welcome, {session.user.name}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
    </main>
  );
}
