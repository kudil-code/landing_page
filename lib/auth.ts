// Server-side authentication utilities

export async function validateToken(token: string): Promise<boolean> {
  try {
    // In a real application, you would:
    // 1. Decode and verify the JWT token
    // 2. Check if token exists in database
    // 3. Check if token is not expired
    // 4. Check if token hasn't been used already
    
    // For demo purposes, we'll simulate a simple validation
    // In production, replace this with actual token validation logic
    console.log('Validating token:', token);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // For demo, assume token is valid if it's not empty
    return token.length > 0;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
}

export async function resendVerificationEmail(email: string): Promise<boolean> {
  try {
    // In a real application, you would:
    // 1. Check if email exists in database
    // 2. Generate new verification token
    // 3. Send email via email service (SendGrid, AWS SES, etc.)
    // 4. Update database with new token
    
    console.log('Resending verification email to:', email);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return true;
  } catch (error) {
    console.error('Resend email error:', error);
    return false;
  }
}



