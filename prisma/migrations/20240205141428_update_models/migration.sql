-- AlterTable
ALTER TABLE `user` MODIFY `resetPasswordToken` LONGTEXT NULL,
    MODIFY `refreshToken` LONGTEXT NULL;
