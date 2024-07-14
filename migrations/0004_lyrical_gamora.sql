ALTER TABLE `profiles` ADD `username` text(32) NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `profile_user_id_index` ON `profiles` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `profile_username_unique` ON `profiles` (`username`);