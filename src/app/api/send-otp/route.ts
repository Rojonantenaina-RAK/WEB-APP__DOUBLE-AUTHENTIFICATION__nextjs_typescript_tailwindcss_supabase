// src/app/api/send-otp/route.ts
import { NextResponse } from 'next/server';
import { sendOtpCode } from '../../../lib/send-otp';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body.email;

    if (!email) {
      return NextResponse.json({ error: 'Email manquant' }, { status: 400 });
    }

    await sendOtpCode(email);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur dans /api/send-otp:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
