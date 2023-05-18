/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Product" (
    "uuid" TEXT NOT NULL,
    "url" TEXT,
    "name" TEXT,
    "description" TEXT,
    "price" DOUBLE PRECISION,
    "brand" TEXT,
    "available" BOOLEAN,
    "imageUrl" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("uuid")
);
