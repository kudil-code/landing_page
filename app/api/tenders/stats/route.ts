import { NextRequest, NextResponse } from 'next/server';
import { TenderService } from '@/lib/services/TenderService';

// GET /api/tenders/stats - Get tender statistics
export async function GET(request: NextRequest) {
  try {
    const stats = await TenderService.getStats();
    
    return NextResponse.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching tender stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tender statistics' },
      { status: 500 }
    );
  }
}
