import { runMigrations } from './migrate-turso.js';
import { seedTursoDatabase } from './seed-turso.js';

async function setupProductionDatabase() {
  console.log('🎯 Setting up Production Database (Turso)...');
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Database URL:', process.env.TURSO_DATABASE_URL?.substring(0, 50) + '...');

  try {
    // Step 1: Run migrations
    console.log('\n📋 Step 1: Running migrations...');
    await runMigrations();

    // Step 2: Seed database
    console.log('\n🌱 Step 2: Seeding database...');
    await seedTursoDatabase();

    console.log('\n🎉 Production database setup completed successfully!');
    console.log('\n✅ Ready for production deployment!');

  } catch (error) {
    console.error('\n❌ Production database setup failed:', error);
    process.exit(1);
  }
}

// Run setup if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  setupProductionDatabase();
}

export { setupProductionDatabase };
