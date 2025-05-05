import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(
  req: NextRequest,
  { params }: { params: { session_id: string } }
) {
  try {
    const session = await stripe.checkout.sessions.retrieve(params.session_id);

    return NextResponse.json(session);
  } catch (error: any) {
    console.error('Error retrieving session:', error);
    return new NextResponse(error.message || 'Internal Server Error', {
      status: error.statusCode || 500,
    });
  }
}

export const config = {
  runtime: 'edge',
};
