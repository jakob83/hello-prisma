import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (tx) => {
    const posts = await tx.post.findMany();
    for (const post of posts) {
      await tx.post.update({
        where: { id: post.id },
        data: {
          status: post.published ? 'Published' : 'Unknown',
        },
      });
    }
  });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
