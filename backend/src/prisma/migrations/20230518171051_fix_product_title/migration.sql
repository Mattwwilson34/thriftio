/*
  Warnings:

  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Products";

-- CreateTable
CREATE TABLE "products" (
    "uuid" TEXT NOT NULL,
    "url" TEXT,
    "name" TEXT,
    "description" TEXT,
    "price" DOUBLE PRECISION,
    "brand" TEXT,
    "available" BOOLEAN,
    "imageUrl" TEXT,

    CONSTRAINT "products_pkey" PRIMARY KEY ("uuid")
);
