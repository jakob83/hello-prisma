-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Unknown', 'Draft', 'InProgress', 'InReview', 'Published');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Unknown';
