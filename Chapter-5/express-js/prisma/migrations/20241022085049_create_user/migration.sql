/*
  Warnings:

  - Made the column `role_id` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "users_email_idx";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role_id" SET NOT NULL,
ALTER COLUMN "role_id" SET DEFAULT 2;
