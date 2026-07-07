/*
  Warnings:

  - You are about to drop the column `gcalCalendarId` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `businessId` on the `google_sync_states` table. All the data in the column will be lost.
  - You are about to drop the column `calendarId` on the `google_sync_states` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[businessId,weekday,startMin,endMin]` on the table `business_hours` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[primaryCalendarId]` on the table `businesses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[businessId,staffId]` on the table `google_oauth_accounts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[googleCalendarId]` on the table `google_sync_states` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `serviceDurationMinSnapshot` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceNameSnapshot` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servicePriceSnapshot` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `googleCalendarId` to the `google_sync_states` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `channel` on the `notification_logs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updatedAt` to the `time_off` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NotificationChannel" AS ENUM ('EMAIL', 'WHATSAPP', 'SMS');

-- CreateEnum
CREATE TYPE "GoogleOAuthAccountType" AS ENUM ('BUSINESS', 'STAFF');

-- AlterEnum
ALTER TYPE "BookingStatus" ADD VALUE 'HOLD';

-- DropForeignKey
ALTER TABLE "google_sync_states" DROP CONSTRAINT "google_sync_states_businessId_fkey";

-- DropIndex
DROP INDEX "bookings_gcalCalendarId_gcalEventId_key";

-- DropIndex
DROP INDEX "business_hours_businessId_weekday_idx";

-- DropIndex
DROP INDEX "google_oauth_accounts_businessId_key";

-- DropIndex
DROP INDEX "google_sync_states_businessId_key";

-- AlterTable
ALTER TABLE "admin_users" ADD COLUMN     "staffId" TEXT;

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "gcalCalendarId",
ADD COLUMN     "customerTokenUsedAt" TIMESTAMP(3),
ADD COLUMN     "googleCalendarId" TEXT,
ADD COLUMN     "holdExpiresAt" TIMESTAMP(3),
ADD COLUMN     "serviceDurationMinSnapshot" INTEGER NOT NULL,
ADD COLUMN     "serviceNameSnapshot" TEXT NOT NULL,
ADD COLUMN     "servicePriceSnapshot" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "staffId" TEXT;

-- AlterTable
ALTER TABLE "businesses" ADD COLUMN     "primaryCalendarId" TEXT;

-- AlterTable
ALTER TABLE "google_oauth_accounts" ADD COLUMN     "accountType" "GoogleOAuthAccountType" NOT NULL DEFAULT 'BUSINESS',
ADD COLUMN     "staffId" TEXT;

-- AlterTable
ALTER TABLE "google_sync_states" DROP COLUMN "businessId",
DROP COLUMN "calendarId",
ADD COLUMN     "googleCalendarId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "notification_logs" DROP COLUMN "channel",
ADD COLUMN     "channel" "NotificationChannel" NOT NULL;

-- AlterTable
ALTER TABLE "time_off" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "staffId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "staff" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_staff" (
    "serviceId" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "service_staff_pkey" PRIMARY KEY ("serviceId","staffId")
);

-- CreateTable
CREATE TABLE "staff_hours" (
    "id" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "weekday" INTEGER NOT NULL,
    "startMin" INTEGER NOT NULL,
    "endMin" INTEGER NOT NULL,
    "isClosed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "staff_hours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "google_calendars" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "googleOAuthAccountId" TEXT NOT NULL,
    "calendarId" TEXT NOT NULL,
    "name" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "google_calendars_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "staff_businessId_isActive_idx" ON "staff"("businessId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "staff_businessId_email_key" ON "staff"("businessId", "email");

-- CreateIndex
CREATE INDEX "service_staff_staffId_idx" ON "service_staff"("staffId");

-- CreateIndex
CREATE INDEX "staff_hours_staffId_weekday_startMin_idx" ON "staff_hours"("staffId", "weekday", "startMin");

-- CreateIndex
CREATE UNIQUE INDEX "staff_hours_staffId_weekday_startMin_endMin_key" ON "staff_hours"("staffId", "weekday", "startMin", "endMin");

-- CreateIndex
CREATE INDEX "google_calendars_googleOAuthAccountId_isPrimary_idx" ON "google_calendars"("googleOAuthAccountId", "isPrimary");

-- CreateIndex
CREATE UNIQUE INDEX "google_calendars_businessId_calendarId_key" ON "google_calendars"("businessId", "calendarId");

-- CreateIndex
CREATE INDEX "admin_users_businessId_isActive_role_idx" ON "admin_users"("businessId", "isActive", "role");

-- CreateIndex
CREATE INDEX "bookings_staffId_startAt_idx" ON "bookings"("staffId", "startAt");

-- CreateIndex
CREATE INDEX "bookings_holdExpiresAt_idx" ON "bookings"("holdExpiresAt");

-- CreateIndex
CREATE INDEX "business_hours_businessId_weekday_startMin_idx" ON "business_hours"("businessId", "weekday", "startMin");

-- CreateIndex
CREATE UNIQUE INDEX "business_hours_businessId_weekday_startMin_endMin_key" ON "business_hours"("businessId", "weekday", "startMin", "endMin");

-- CreateIndex
CREATE UNIQUE INDEX "businesses_primaryCalendarId_key" ON "businesses"("primaryCalendarId");

-- CreateIndex
CREATE INDEX "google_oauth_accounts_businessId_accountType_idx" ON "google_oauth_accounts"("businessId", "accountType");

-- CreateIndex
CREATE UNIQUE INDEX "google_oauth_accounts_businessId_staffId_key" ON "google_oauth_accounts"("businessId", "staffId");

-- CreateIndex
CREATE UNIQUE INDEX "google_sync_states_googleCalendarId_key" ON "google_sync_states"("googleCalendarId");

-- CreateIndex
CREATE INDEX "notification_logs_bookingId_channel_idx" ON "notification_logs"("bookingId", "channel");

-- CreateIndex
CREATE INDEX "time_off_staffId_date_idx" ON "time_off"("staffId", "date");

-- AddForeignKey
ALTER TABLE "businesses" ADD CONSTRAINT "businesses_primaryCalendarId_fkey" FOREIGN KEY ("primaryCalendarId") REFERENCES "google_calendars"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_users" ADD CONSTRAINT "admin_users_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_staff" ADD CONSTRAINT "service_staff_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_staff" ADD CONSTRAINT "service_staff_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff_hours" ADD CONSTRAINT "staff_hours_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_off" ADD CONSTRAINT "time_off_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_googleCalendarId_fkey" FOREIGN KEY ("googleCalendarId") REFERENCES "google_calendars"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "google_oauth_accounts" ADD CONSTRAINT "google_oauth_accounts_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "google_calendars" ADD CONSTRAINT "google_calendars_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "google_calendars" ADD CONSTRAINT "google_calendars_googleOAuthAccountId_fkey" FOREIGN KEY ("googleOAuthAccountId") REFERENCES "google_oauth_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "google_sync_states" ADD CONSTRAINT "google_sync_states_googleCalendarId_fkey" FOREIGN KEY ("googleCalendarId") REFERENCES "google_calendars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
