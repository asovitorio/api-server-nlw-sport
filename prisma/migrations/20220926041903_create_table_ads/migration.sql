-- CreateTable
CREATE TABLE "ads" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "years_playing" INTEGER NOT NULL,
    "discord" TEXT NOT NULL,
    "week_days" TEXT NOT NULL,
    "hours_start" INTEGER NOT NULL,
    "hours_end" INTEGER NOT NULL,
    "use_voice_channel" INTEGER NOT NULL,
    "game_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "ads_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
