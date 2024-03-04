-- AlterTable
ALTER TABLE `user` MODIFY `resetPasswordExpire` DATETIME(3) NULL,
    MODIFY `resetPasswordToken` VARCHAR(191) NULL;
