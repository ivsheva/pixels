-- AlterTable
ALTER TABLE "Shot" ALTER COLUMN "views" SET DEFAULT 0,
ALTER COLUMN "saves" SET DEFAULT 0,
ALTER COLUMN "likes" SET DEFAULT 0,
ALTER COLUMN "comments" SET DEFAULT 0,
ALTER COLUMN "tags" SET DEFAULT ARRAY[]::"Tag"[];
