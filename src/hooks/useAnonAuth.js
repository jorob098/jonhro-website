import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function useAnonAuth() {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        setUserId(session.user.id);
      } else {
        const { data, error } = await supabase.auth.signInAnonymously();
        if (error) {
          console.error("Anonymous sign-in failed:", error.message);
        } else {
          setUserId(data.user.id);
        }
      }
      setLoading(false);
    };

    init();
  }, []);

  return { userId, loading };
}