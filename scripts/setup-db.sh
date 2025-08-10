#!/bin/bash
# Production database seeding script

echo "🚀 Setting up production database..."

# Check if we're in production
if [ "$NODE_ENV" = "production" ]; then
    echo "📦 Using Turso database..."
    echo "Database URL: $TURSO_DATABASE_URL"
else
    echo "🏠 Using local SQLite database..."
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Push database schema
echo "📋 Pushing database schema..."
npx prisma db push --force-reset

# Seed data
echo "🌱 Seeding database with initial data..."
tsx prisma/seed.ts

echo "✅ Database setup complete!"
