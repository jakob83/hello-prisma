import { PrismaClient, Prisma } from './generated/prisma';
import { getUsersAndPosts } from './generated/prisma/sql/getUsersAndPosts';

const prisma = new PrismaClient();

async function main() {
  const createMany = await prisma.user.createMany({
    data: [
      { name: 'Bob', email: 'bob@prisma.io' },
      { name: 'Bobo', email: 'bob@prisma.io' }, // Duplicate unique key!
      { name: 'Yewande', email: 'yewande@prisma.io' },
      { name: 'Angelique', email: 'angelique@prisma.io' },
    ],
    skipDuplicates: true, // Skip 'Bobo'
  });
  console.log(createMany); // => { count: 3}, so only 3 are inserted

  // There is also just updateMany
  const update = await prisma.post.updateManyAndReturn({
    where: {
      title: 'Hello my Afrcian Fellas',
      author: { email: { contains: 'nico' } },
    },
    data: { title: 'Hello my Niggas' },
  });
  console.log(update);

  // await prisma.user.create({
  //   // id is auto generated and the other properties have either default values or are not required => ?

  //   data: {
  //     name: 'Nicolas',
  //     email: 'nicojackson@prisma.io',
  //     posts: {
  //       create: { title: 'Hello my Niggas' },
  //     },
  //     profile: {
  //       create: { bio: 'I love eating turtles' },
  //     },
  //   },
  //});

  /*await prisma.user.delete({
    where: { email: 'alice@prisma.io' }, // => doesnt't work, because user has posts and posts have a required User field, which would disappear
    // would have to first delete all the users posts and then the user
  });*/

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
  console.dir(allUsers, { depth: null });

  const prismaUser = await prisma.user.findMany({
    where: { email: { endsWith: 'prisma.io' } },
  });
  console.log('Primsa Users:');
  console.log(prismaUser);
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
  })
  .finally(() => {
    prisma.$disconnect();
  });
