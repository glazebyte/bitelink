const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new PrismaClient();

// Function to seed the database
async function seed() {
  const args = process.argv.slice(2); // Get arguments passed to the script
  if (args.length === 0) {
    console.log("Please provide a SQL file to seed.");
    process.exit(1);
  }
  const transaction = await prisma.$transaction([]);

  try {
    for (const arg of args) {
      const filePath = path.resolve(__dirname, "seed", arg);
      if (fs.existsSync(filePath)) {
        console.log(typeof filePath);
        // Execute the SQL file within the transaction
        // console.log("Seeding SQL file:", filePath);
        const sql = fs.readFileSync(filePath, "utf-8");
        await prisma.$executeRawUnsafe(sql); // Executes raw SQL
        console.log(`Successfully executed SQL from ${filePath}`);
      } else {
        console.log(`File not found: ${filePath}`);
      }
    }

    // If all seed files are successful, commit the transaction
    await prisma.$transaction(transaction);
    console.log("Seeding completed successfully.");
  } catch (error) {
    // If any error occurs, the transaction will be rolled back automatically
    console.error("Seeding failed. Rolling back transaction.");
    console.log(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client
  }

  await prisma.$disconnect(); // Disconnect Prisma client
}

seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
