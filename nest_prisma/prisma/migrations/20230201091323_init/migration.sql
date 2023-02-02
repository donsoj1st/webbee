-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_menu_items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "parentId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_menu_items" ("createdAt", "id", "name", "parentId", "url") SELECT "createdAt", "id", "name", "parentId", "url" FROM "menu_items";
DROP TABLE "menu_items";
ALTER TABLE "new_menu_items" RENAME TO "menu_items";
CREATE TABLE "new_workshops" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL
);
INSERT INTO "new_workshops" ("createdAt", "end", "eventId", "id", "name", "start") SELECT "createdAt", "end", "eventId", "id", "name", "start" FROM "workshops";
DROP TABLE "workshops";
ALTER TABLE "new_workshops" RENAME TO "workshops";
CREATE TABLE "new_events" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_events" ("createdAt", "id", "name") SELECT "createdAt", "id", "name" FROM "events";
DROP TABLE "events";
ALTER TABLE "new_events" RENAME TO "events";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
