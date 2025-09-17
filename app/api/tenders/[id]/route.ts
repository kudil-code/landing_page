import { NextRequest, NextResponse } from 'next/server';
import { TenderService } from '@/lib/services/TenderService';
import { TenderUpdate } from '@/types/types';

// GET /api/tenders/[id] - Get tender by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid tender ID' },
        { status: 400 }
      );
    }

    const tender = await TenderService.getById(id);
    
    if (!tender) {
      return NextResponse.json(
        { success: false, error: 'Tender not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: tender
    });
  } catch (error) {
    console.error('Error fetching tender:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tender' },
      { status: 500 }
    );
  }
}

// PUT /api/tenders/[id] - Update tender
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid tender ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const tenderData: Partial<TenderUpdate> = body;
    
    const tender = await TenderService.update(id, tenderData);
    
    if (!tender) {
      return NextResponse.json(
        { success: false, error: 'Tender not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: tender
    });
  } catch (error) {
    console.error('Error updating tender:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update tender' },
      { status: 500 }
    );
  }
}

// DELETE /api/tenders/[id] - Delete tender
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid tender ID' },
        { status: 400 }
      );
    }

    const deleted = await TenderService.delete(id);
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Tender not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Tender deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting tender:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete tender' },
      { status: 500 }
    );
  }
}
