import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const supabaseUrl = Deno.env.get("SUPABASE_URL")!
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
const supabase = createClient(supabaseUrl, supabaseKey)

serve(async (req) => {
  const data = await req.json();
  const message = data.message?.text;
  const user = data.message?.from?.username || "TelegramUser";

  if (!message) return new Response("No message", { status: 400 });

  const { error } = await supabase.from("messages").insert([
    { username: user, content: message, source: "telegram" },
  ]);

  if (error) return new Response(`DB Error: ${error.message}`, { status: 500 });

  return new Response("Message saved", { status: 200 });
});
