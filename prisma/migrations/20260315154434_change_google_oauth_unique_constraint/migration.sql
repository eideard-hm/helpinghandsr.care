/*
  Warnings:

  - A unique constraint covering the columns `[businessId,accountType,provider]` on the table `google_oauth_accounts` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "google_oauth_accounts_businessId_accountType_idx";

-- DropIndex
DROP INDEX "google_oauth_accounts_businessId_staffId_key";

-- CreateIndex
CREATE INDEX "google_oauth_accounts_businessId_staffId_idx" ON "google_oauth_accounts"("businessId", "staffId");

-- CreateIndex
CREATE UNIQUE INDEX "google_oauth_accounts_businessId_accountType_provider_key" ON "google_oauth_accounts"("businessId", "accountType", "provider");
