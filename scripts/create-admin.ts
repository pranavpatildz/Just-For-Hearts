import 'dotenv/config'
import { prisma } from "../src/lib/prisma.js"
import { hashPassword } from "../src/lib/auth.js"

async function main() {
  const existing = await prisma.adminUser.findUnique({
    where: { email: "admin@jfh.com" },
  })

  if (existing) {
    console.log("Admin already exists")
    return
  }

  const password = await hashPassword("admin123")

  await prisma.adminUser.create({
    data: {
      name: "Super Admin",
      email: "admin@jfh.com",
      password,
      role: "SUPER_ADMIN",
    },
  })

  console.log("Admin created successfully")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())