/*
  Warnings:

  - You are about to drop the `availability` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `car_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cars` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `manufactures` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `models` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `option_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `options` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `spec_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `specs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "car_details" DROP CONSTRAINT "car_details_cars_id_fkey";

-- DropForeignKey
ALTER TABLE "cars" DROP CONSTRAINT "cars_availability_id_fkey";

-- DropForeignKey
ALTER TABLE "cars" DROP CONSTRAINT "cars_manufacture_id_fkey";

-- DropForeignKey
ALTER TABLE "cars" DROP CONSTRAINT "cars_model_id_fkey";

-- DropForeignKey
ALTER TABLE "options" DROP CONSTRAINT "options_cars_id_fkey";

-- DropForeignKey
ALTER TABLE "options" DROP CONSTRAINT "options_option_details_id_fkey";

-- DropForeignKey
ALTER TABLE "specs" DROP CONSTRAINT "specs_cars_id_fkey";

-- DropForeignKey
ALTER TABLE "specs" DROP CONSTRAINT "specs_spec_details_id_fkey";

-- DropTable
DROP TABLE "availability";

-- DropTable
DROP TABLE "car_details";

-- DropTable
DROP TABLE "cars";

-- DropTable
DROP TABLE "manufactures";

-- DropTable
DROP TABLE "models";

-- DropTable
DROP TABLE "option_details";

-- DropTable
DROP TABLE "options";

-- DropTable
DROP TABLE "spec_details";

-- DropTable
DROP TABLE "specs";

-- CreateTable
CREATE TABLE "classes" (
    "id" BIGSERIAL NOT NULL,
    "class" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "nick_name" VARCHAR(255) NOT NULL,
    "profile_picture" TEXT,
    "class_id" BIGINT NOT NULL,
    "university_id" BIGINT NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "universities" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "country" VARCHAR(255) NOT NULL,

    CONSTRAINT "universities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
