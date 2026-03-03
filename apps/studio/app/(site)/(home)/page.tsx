'use client'

import { ReactElement } from "react";
import { signIn } from "next-auth/react";

export default function Home(): ReactElement {
  return (
    <div>
      <h1>Go to /studio route</h1>
      <button className="bg-amber-500" onClick={() => signIn("google")}>
        Go to admin panel
      </button>
    </div>
  );
}
