import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { code, state } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: 'Authorization code is required' },
        { status: 400 }
      );
    }

    // Verify state parameter (in production, store this in a secure session)
    // For demo purposes, we'll skip this verification

    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/google/callback`,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for tokens');
    }

    const tokens = await tokenResponse.json();

    // Get user info from Google
    const userResponse = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokens.access_token}`
    );

    if (!userResponse.ok) {
      throw new Error('Failed to get user info');
    }

    const userInfo = await userResponse.json();

    // In a real application, you would:
    // 1. Check if user exists in your database
    // 2. Create user if they don't exist
    // 3. Generate JWT tokens
    // 4. Set secure HTTP-only cookies

    // For demo purposes, return user info
    return NextResponse.json({
      user: {
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
        verified_email: userInfo.verified_email,
      },
      tokens: {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      },
    });

  } catch (error) {
    console.error('Google OAuth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}



