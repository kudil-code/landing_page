import { NextRequest, NextResponse } from 'next/server';
import { TenderService } from '@/lib/services/TenderService';

// GET /api/tenders/filter-options - Get filter options for tenders
export async function GET(request: NextRequest) {
  try {
    const filterOptions = await TenderService.getFilterOptions();
    
    return NextResponse.json({
      success: true,
      data: filterOptions
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch filter options' },
      { status: 500 }
    );
  }
}
