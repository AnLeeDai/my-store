import { setupProductionDatabase } from '@/scripts/setup-production-db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Only allow in production
  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.json({ 
      error: 'This endpoint is only available in production' 
    }, { status: 403 });
  }

  // Basic auth check (you should implement proper authentication)
  const authHeader = request.headers.get('authorization');
  if (!authHeader || authHeader !== `Bearer ${process.env.SETUP_SECRET}`) {
    return NextResponse.json({ 
      error: 'Unauthorized' 
    }, { status: 401 });
  }

  try {
    await setupProductionDatabase();
    
    return NextResponse.json({ 
      success: true,
      message: 'Production database setup completed successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database setup failed:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Database setup failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
