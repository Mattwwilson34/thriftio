/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Product";

-- CreateTable
CREATE TABLE "Products" (
    "uuid" TEXT NOT NULL,
    "url" TEXT,
    "name" TEXT,
    "description" TEXT,
    "price" DOUBLE PRECISION,
    "brand" TEXT,
    "available" BOOLEAN,
    "imageUrl" TEXT,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("uuid")
);
