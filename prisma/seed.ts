import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient, UserRole } from '@/generated/prisma/client';

import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const business = await prisma.business.create({
    data: {
      name: 'ZeinMotion',
      timezone: 'America/Bogota',
      notificationEmail: 'edierhernandezmo@gmail.com',
      whatsappNumber: '57300XXXXXXX',
      bufferMin: 10,
    },
  });

  const staff = await prisma.staff.create({
    data: {
      businessId: business.id,
      name: 'Principal',
      email: 'edierhernandezmo@gmail.com',
      isActive: true,
    },
  });

  const admin = await prisma.adminUser.create({
    data: {
      businessId: business.id,
      email: 'edierhernandezmo@gmail.com',
      role: UserRole.ADMIN,
      isActive: true,
      staffId: staff.id,
    },
  });

  // Horario base (L-S 9:00-18:00)
  const hours = [
    { weekday: 0, startMin: 0, endMin: 0, isClosed: true },
    { weekday: 1, startMin: 540, endMin: 1080, isClosed: false },
    { weekday: 2, startMin: 540, endMin: 1080, isClosed: false },
    { weekday: 3, startMin: 540, endMin: 1080, isClosed: false },
    { weekday: 4, startMin: 540, endMin: 1080, isClosed: false },
    { weekday: 5, startMin: 540, endMin: 1080, isClosed: false },
    { weekday: 6, startMin: 540, endMin: 1080, isClosed: false },
  ];

  await prisma.businessHour.createMany({
    data: hours.map((h) => ({ ...h, businessId: business.id })),
    skipDuplicates: true,
  });

  const service = await prisma.service.create({
    data: {
      businessId: business.id,
      name: 'Servicio principal',
      durationMin: 60,
      price: 80000,
      active: true,
    },
  });

  await prisma.serviceStaff.create({
    data: { serviceId: service.id, staffId: staff.id, isDefault: true },
  });

  console.log('Seed OK', {
    businessId: business.id,
    adminId: admin.id,
    staffId: staff.id,
    serviceId: service.id,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
