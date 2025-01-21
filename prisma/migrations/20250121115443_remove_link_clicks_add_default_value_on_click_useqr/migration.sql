/*
  Warnings:

  - You are about to drop the column `clicks` on the `Link` table. All the data in the column will be lost.
  - Made the column `useqr` on table `Click` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Click` MODIFY `useqr` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Link` DROP COLUMN `clicks`;
