import { NextResponse } from "next/server";
import { z } from "zod";
import { subscribeEmail } from "@bytescope/data";
import { createClient } from "@/lib/supabase/server";

const subscribeInput = z.object({
  email: z.string().email(),
  source: z.string().optional(),
});

// Public endpoint — RLS's "anyone can subscribe" insert policy on
// newsletter_subscribers does the real access control, not this route.
// CORS is open because the public editions (ui-edition, demo-sites) run on
// a different origin/port than this admin app in local dev; lock
// Access-Control-Allow-Origin down to your real public domain in production.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = subscribeInput.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400, headers: corsHeaders() });
  }

  const supabase = await createClient();

  try {
    await subscribeEmail(supabase, parsed.data.email, parsed.data.source);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Subscription failed";
    const alreadySubscribed = message.includes("duplicate key");
    return NextResponse.json(
      { error: alreadySubscribed ? "Already subscribed" : message },
      { status: alreadySubscribed ? 200 : 500, headers: corsHeaders() },
    );
  }

  return NextResponse.json({ ok: true }, { headers: corsHeaders() });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
