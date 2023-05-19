-- CreateTable
CREATE TABLE "productTypeMapping" (
    "productId" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,

    CONSTRAINT "productTypeMapping_pkey" PRIMARY KEY ("productId","typeId")
);

-- AddForeignKey
ALTER TABLE "productTypeMapping" ADD CONSTRAINT "productTypeMapping_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productTypeMapping" ADD CONSTRAINT "productTypeMapping_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "types"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
