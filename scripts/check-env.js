const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
const envExamplePath = path.join(__dirname, '..', '.env.example');

function parseEnvFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const keys = [];

    content.split('\n').forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
            const [key] = trimmed.split('=');
            if (key) {
                keys.push(key.trim());
            }
        }
    });

    return keys;
}

function checkEnv() {
    console.log('Checking environment configuration...\n');

    if (!fs.existsSync(envPath)) {
        console.error('❌ Error: .env file not found.');
        console.log('Run "npm run init:env" to create it from .env.example\n');
        process.exit(1);
    }

    if (!fs.existsSync(envExamplePath)) {
        console.error('❌ Error: .env.example file not found.');
        process.exit(1);
    }

    try {
        const exampleKeys = parseEnvFile(envExamplePath);
        const envKeys = parseEnvFile(envPath);

        const missingKeys = exampleKeys.filter((key) => !envKeys.includes(key));

        if (missingKeys.length > 0) {
            console.error('❌ Missing environment variables in .env:');
            missingKeys.forEach((key) => console.log(`   - ${key}`));
            console.log('\nPlease add these variables to your .env file.\n');
            process.exit(1);
        }

        console.log('✓ All required environment variables are present');
        console.log('✓ Environment configuration is valid!\n');
    } catch (error) {
        console.error('Error checking environment:', error);
        process.exit(1);
    }
}

checkEnv();

