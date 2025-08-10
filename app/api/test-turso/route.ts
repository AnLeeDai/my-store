import { client } from '@/lib/turso';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test Turso connection
    const result = await client.execute('SELECT 1 as test, datetime("now") as current_time');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Turso database connection successful',
      data: result.rows,
      metadata: {
        rowCount: result.rows.length,
        columns: result.columns,
      }
    });
  } catch (error) {
    console.error('Turso connection test failed:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to connect to Turso database',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
