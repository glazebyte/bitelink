// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Membuat user
  const user = await prisma.user.findUnique({
    where: {
      email: 'zakyfauzi44@gmail.com',
  }})

//   console.log('Created user:', user);

//   // Membuat akun untuk user
//   const account = await prisma.account.create({
//     data: {
//       userId: user.id,
//       providerType: 'google',
//       providerId: 'google',
//       providerAccountId: '104700041455836832552',
//       accessToken: 'sample-access-token',
//     },
//   });

//   console.log('Created account:', account);

  // Menambahkan banyak link untuk user
  const linksData = [
    { originalUrl: 'https://example1.com', shortUrl: 'ex1', isPrivate: false },
    { originalUrl: 'https://example2.com', shortUrl: 'ex2', isPrivate: false },
    { originalUrl: 'https://example3.com', shortUrl: 'ex3', isPrivate: true },
    { originalUrl: 'https://example4.com', shortUrl: 'ex4', isPrivate: false },
    { originalUrl: 'https://example5.com', shortUrl: 'ex5', isPrivate: true },
  ];

  const links = await prisma.link.createMany({
    data: linksData.map(link => ({
      userId: user.id,  // Pastikan setiap link terkait dengan user
      originalUrl: link.originalUrl,
      shortUrl: link.shortUrl,
      isPrivate: link.isPrivate,
    })),
  });

  console.log(`Created ${links.count} links.`);
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  });
