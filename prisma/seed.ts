import { PrismaClient, Role } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const org = await prisma.org.upsert({
    where: { id: "seed-org" },
    update: {},
    create: { id: "seed-org", name: "My Solar Co" },
  });

  await prisma.user.create({
    data: { email: "admin@example.com", name: "Admin", role: Role.ADMIN, orgId: org.id },
  });

  const cust = await prisma.customer.create({
    data: { orgId: org.id, name: "Acme Bakery", email: "owner@acme.com", address: "12 High St, London" },
  });

  await prisma.job.create({
    data: { orgId: org.id, customerId: cust.id, type: "COMMERCIAL", address: "12 High St, London", stage: "SALE" },
  });

  console.log("Seeded. Admin user: admin@example.com");
}

main().finally(() => prisma.$disconnect());
