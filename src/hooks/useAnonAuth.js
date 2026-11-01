import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

/**
 * Returns the visitor's anonymous Supabase user ID.
 * A returning visitor's saved session is picked up right away, but a new
 * anonymous account is only created once `shouldSignIn` is true (i.e. when
 * they open the chat), so casual visitors and bots don't create accounts.
 */
export default function useAnonAuth(shouldSignIn = false) {
  const [userId, setUserId] = useState(null);
  const [checked, setChecked] = useState(false);
  const [signingIn, setSigningIn] = useState(false);

  // Pick up an existing session (no network sign-up).
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) setUserId(session.user.id);
      setChecked(true);
    });
  }, []);

  // Create an anonymous account only when needed.
  useEffect(() => {
    if (!checked || userId || !shouldSignIn || signingIn) return;
    setSigningIn(true);
    supabase.auth.signInAnonymously().then(({ data, error }) => {
      if (error) console.error("Anonymous sign-in failed:", error.message);
      else setUserId(data.user.id);
      setSigningIn(false);
    });
  }, [checked, userId, shouldSignIn, signingIn]);

  return { userId, loading: !checked || signingIn };
}
