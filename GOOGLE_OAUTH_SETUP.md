# Google OAuth Setup Guide

## 1. Create Google OAuth Application

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Configure the OAuth consent screen if prompted
6. Set application type to "Web application"
7. Add authorized redirect URIs:
   - `http://localhost:3000/auth/google/callback` (for development)
   - `https://yourdomain.com/auth/google/callback` (for production)

## 2. Environment Variables

Create a `.env.local` file in your project root with:

```env
# Google OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 3. Security Considerations

- Never commit your `.env.local` file to version control
- Use different client IDs for development and production
- Implement proper state parameter validation
- Store user sessions securely (JWT tokens, HTTP-only cookies)
- Implement proper error handling and logging

## 4. Production Deployment

- Update the redirect URI in Google Console to match your production domain
- Use HTTPS in production
- Implement proper session management
- Add rate limiting and security headers
- Monitor OAuth flows for suspicious activity

## 5. Testing

1. Start your development server: `npm run dev`
2. Navigate to `/login`
3. Click "Lanjutkan dengan Google"
4. Complete the OAuth flow
5. Verify successful login and redirect to dashboard




