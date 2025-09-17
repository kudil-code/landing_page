const { testConnection } = require('./database/database');

async function test() {
  try {
    console.log('🔍 Testing database connection...');
    const result = await testConnection();
    console.log('✅ Database connection:', result ? 'SUCCESS' : 'FAILED');
    
    if (result) {
      console.log('🎉 Database is ready!');
    } else {
      console.log('❌ Database connection failed. Please check your configuration.');
    }
  } catch (error) {
    console.error('❌ Error testing database connection:', error.message);
  }
}

test();
