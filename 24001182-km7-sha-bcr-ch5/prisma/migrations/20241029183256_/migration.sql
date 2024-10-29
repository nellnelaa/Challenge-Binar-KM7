/*
  Warnings:

  - The primary key for the `cars` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `cars` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "cars" DROP CONSTRAINT "cars_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "cars_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "users";
