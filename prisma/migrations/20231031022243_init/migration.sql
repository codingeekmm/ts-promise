-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "qty" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL,
    "school_type" TEXT NOT NULL,
    "divide_pot" INTEGER NOT NULL,
    "cut" INTEGER NOT NULL,
    "conversion_kg" DOUBLE PRECISION NOT NULL,
    "conversion_bag" INTEGER NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);
