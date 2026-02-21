-- AlterTable
ALTER TABLE "account" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE "session" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
