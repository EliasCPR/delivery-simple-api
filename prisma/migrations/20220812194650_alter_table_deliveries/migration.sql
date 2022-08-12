-- DropForeignKey
ALTER TABLE "deliveries" DROP CONSTRAINT "deliveries_deliveryman_id_fkey";

-- AlterTable
ALTER TABLE "deliveries" ALTER COLUMN "deliveryman_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_deliveryman_id_fkey" FOREIGN KEY ("deliveryman_id") REFERENCES "deliverymen"("id") ON DELETE SET NULL ON UPDATE CASCADE;
