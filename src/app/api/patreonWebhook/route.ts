

import crypto from 'crypto';
import { NextRequest ,NextResponse} from 'next/server';

export default async function POST(req:NextRequest) {

  if (req.method !== "POST") {
    return NextResponse.json({ message: "Method Not Allowed" },{status:405});
  }

  const signature: any = req.headers.get('x-patreon-signature'); 
  const payload :any= await req.json(); 

  // Verify the signature to ensure it's from Patreon
  if (!verifySignature(signature, payload, process.env.PATREON_WEBHOOK_SECRET)) {
    return NextResponse.json({ message: "Invalid signature" },{status:400});
  }

  // Process the webhook event
  const event:any = payload.data;
  const eventType = event.type; // This tells us what kind of event it is

  // Log the event to see what you're getting
  console.log("Received Patreon Webhook Event:", eventType, event);

  // Handle different types of events
  if (eventType === "membership:create" || eventType === "membership:update") {
    console.log("A new patron has pledged or updated their pledge!");
    const userId = event.relationships.user.data.id;
    console.log(`Patron User ID: ${userId}`);
    // You could perform any actions here, like sending an email or updating a file
  }

  if (eventType === "membership:cancel" || eventType === "membership:delete") {
    console.log("A patron has canceled their pledge or deleted their account!");
    const userId = event.relationships.user.data.id;
    console.log(`Patron User ID: ${userId}`);
    // You can perform actions here too
  }

  // Respond with success
  return NextResponse.json({ message: "Webhook processed successfully" },{status:200});
}

// Function to verify the signature to ensure it's from Patreon
function verifySignature(signature:any, payload:any, secret:any) {
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(JSON.stringify(payload)); 
  const computedSignature = hmac.digest("hex"); 
  return computedSignature === signature; 
}
