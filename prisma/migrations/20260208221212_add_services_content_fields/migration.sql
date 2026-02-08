-- AlterTable
ALTER TABLE "services" ADD COLUMN     "benefits" JSONB,
ADD COLUMN     "bigImage" TEXT,
ADD COLUMN     "details" JSONB,
ADD COLUMN     "excerpt" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "isMain" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "waLink" TEXT;
