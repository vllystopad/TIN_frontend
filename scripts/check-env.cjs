const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "..", ".env");

const REQUIRED_ENV_VARS = [
    "PORT",
    "VITE_API_URL",
    "VITE_API_TIMEOUT",
    "VITE_APP_NAME",
    "VITE_DEFAULT_LANGUAGE",
];

function parseEnvFile(filePath) {
    const content = fs.readFileSync(filePath, "utf-8");
    const keys = [];

    content.split("\n").forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#")) {
            const [key] = trimmed.split("=");
            if (key) {
                keys.push(key.trim());
            }
        }
    });

    return keys;
}

function checkEnv() {
    console.log("Checking environment configuration...\n");

    if (!fs.existsSync(envPath)) {
        console.error("❌ Error: .env file not found.");
        console.log("Please create a .env file with the following variables:");
        REQUIRED_ENV_VARS.forEach((key) => console.log(`   - ${key}`));
        console.log("\nYou can copy .env.example to .env as a starting point.\n");
        process.exit(1);
    }

    try {
        const envKeys = parseEnvFile(envPath);
        const missingKeys = REQUIRED_ENV_VARS.filter(
            (key) => !envKeys.includes(key)
        );

        if (missingKeys.length > 0) {
            console.error("❌ Missing environment variables in .env:");
            missingKeys.forEach((key) => console.log(`   - ${key}`));
            console.log("\nPlease add these variables to your .env file.\n");
            process.exit(1);
        }

        console.log("✓ All required environment variables are present");
        console.log("✓ Environment configuration is valid!\n");
    } catch (error) {
        console.error("Error checking environment:", error);
        process.exit(1);
    }
}

checkEnv();
