import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend('re_Q9JWPmaa_74faVADKmzS34cP7yW82HCKU');

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, phone, industry, message } = await request.json();

    // Validasi input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nama, email, dan pesan harus diisi' },
        { status: 400 }
      );
    }

    // Kirim email ke admin
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['fadillaphone@gmail.com'],
      subject: `Pesan Baru dari ${name} - ${company || 'Tidak disebutkan'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4A6FA5;">Pesan Baru dari Website</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Informasi Pengirim:</h3>
            <p><strong>Nama:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Perusahaan:</strong> ${company || 'Tidak disebutkan'}</p>
            <p><strong>Telepon:</strong> ${phone || 'Tidak disebutkan'}</p>
            <p><strong>Industri:</strong> ${industry || 'Tidak disebutkan'}</p>
          </div>
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #4A6FA5;">
            <h3 style="color: #333; margin-top: 0;">Pesan:</h3>
            <p style="line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background-color: #e8f4f8; border-radius: 8px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              Email ini dikirim dari form kontak website pada ${new Date().toLocaleString('id-ID')}
            </p>
          </div>
        </div>
      `,
    });

    // Kirim email konfirmasi ke pengirim
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [email],
      subject: 'Terima Kasih - Pesan Anda Telah Diterima',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4A6FA5;">Terima Kasih, ${name}!</h2>
          <p>Pesan Anda telah berhasil dikirim dan akan segera kami proses.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Ringkasan Pesan Anda:</h3>
            <p><strong>Perusahaan:</strong> ${company || 'Tidak disebutkan'}</p>
            <p><strong>Industri:</strong> ${industry || 'Tidak disebutkan'}</p>
            <p><strong>Pesan:</strong></p>
            <div style="background-color: #fff; padding: 15px; border-left: 4px solid #4A6FA5; margin-top: 10px;">
              <p style="line-height: 1.6; margin: 0;">${message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>

          <div style="background-color: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #4A6FA5; margin-top: 0;">Apa Selanjutnya?</h3>
            <ul style="color: #666; line-height: 1.6;">
              <li>Tim kami akan meninjau pesan Anda dalam 24 jam</li>
              <li>Kami akan menghubungi Anda melalui email atau telepon</li>
              <li>Untuk pertanyaan mendesak, hubungi kami di +62 812-3456-7890</li>
            </ul>
          </div>

          <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              <strong>Tender Information</strong><br>
              Email: info@tenderinformation.id<br>
              Telepon: +62 812-3456-7890<br>
              WhatsApp: +62 812-3456-7890
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { message: 'Email berhasil dikirim' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Gagal mengirim email' },
      { status: 500 }
    );
  }
}
