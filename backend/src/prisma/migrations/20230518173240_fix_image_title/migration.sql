/*
  Warnings:

  - You are about to drop the column `imageurl` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" RENAME COLUMN "imageurl" TO "imageUrl";
