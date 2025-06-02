-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `login` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `User_login_key`(`login`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reviews` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `stars` INTEGER NOT NULL,
    `createdAt` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Events` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(250) NOT NULL,
    `description` VARCHAR(999) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `times` VARCHAR(191) NOT NULL,
    `duration` INTEGER NOT NULL,
    `cabinet` VARCHAR(191) NOT NULL,
    `people_count` INTEGER NOT NULL,
    `whoClasses` VARCHAR(191) NOT NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `prepod` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `specialityId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventSpeciality` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecordGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `school` VARCHAR(191) NOT NULL,
    `class` VARCHAR(191) NOT NULL,
    `firstNameAttendant` VARCHAR(191) NOT NULL,
    `lastNameAttendant` VARCHAR(191) NOT NULL,
    `SurnameAttendant` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NOT NULL,
    `countPeople` INTEGER NOT NULL,
    `listPeople` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `eventsId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecordInvididual` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `surname` VARCHAR(191) NULL,
    `school` VARCHAR(191) NOT NULL,
    `class` VARCHAR(191) NOT NULL,
    `telephoneNumber` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `eventsId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Events` ADD CONSTRAINT `Events_specialityId_fkey` FOREIGN KEY (`specialityId`) REFERENCES `EventSpeciality`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecordGroup` ADD CONSTRAINT `RecordGroup_eventsId_fkey` FOREIGN KEY (`eventsId`) REFERENCES `Events`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecordInvididual` ADD CONSTRAINT `RecordInvididual_eventsId_fkey` FOREIGN KEY (`eventsId`) REFERENCES `Events`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
