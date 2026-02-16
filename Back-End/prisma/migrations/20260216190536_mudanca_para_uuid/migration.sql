/*
  Warnings:

  - The primary key for the `conhecimentos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `pessoas` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "conhecimentos" DROP CONSTRAINT "conhecimentos_pessoa_id_fkey";

-- AlterTable
ALTER TABLE "conhecimentos" DROP CONSTRAINT "conhecimentos_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "pessoa_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "conhecimentos_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "conhecimentos_id_seq";

-- AlterTable
ALTER TABLE "pessoas" DROP CONSTRAINT "pessoas_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "pessoas_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "pessoas_id_seq";

-- AddForeignKey
ALTER TABLE "conhecimentos" ADD CONSTRAINT "conhecimentos_pessoa_id_fkey" FOREIGN KEY ("pessoa_id") REFERENCES "pessoas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
