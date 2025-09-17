import { NextRequest, NextResponse } from 'next/server';
import { TenderService } from '@/lib/services/TenderService';
import { TenderCreate, TenderFilters } from '@/types/types';

// GET /api/tenders - Get all tenders with filters and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const filters: TenderFilters = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
      sortBy: searchParams.get('sortBy') || 'created_at',
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
      search: searchParams.get('search') || undefined,
      satuan_kerja: searchParams.get('satuan_kerja') || undefined,
      jenis_pengadaan: searchParams.get('jenis_pengadaan') || undefined,
      status: searchParams.get('status') || undefined,
      dateFrom: searchParams.get('dateFrom') || undefined,
      dateTo: searchParams.get('dateTo') || undefined,
      minValue: searchParams.get('minValue') ? parseFloat(searchParams.get('minValue')!) : undefined,
      maxValue: searchParams.get('maxValue') ? parseFloat(searchParams.get('maxValue')!) : undefined,
    };

    const result = await TenderService.getAll(filters);
    
    return NextResponse.json({
      success: true,
      data: result.tenders,
      pagination: result.pagination
    });
  } catch (error) {
    console.error('Error fetching tenders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tenders' },
      { status: 500 }
    );
  }
}

// POST /api/tenders - Create a new tender
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const tenderData: TenderCreate = body;
    
    const tender = await TenderService.create(tenderData);
    
    return NextResponse.json({
      success: true,
      data: tender
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating tender:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create tender' },
      { status: 500 }
    );
  }
}
