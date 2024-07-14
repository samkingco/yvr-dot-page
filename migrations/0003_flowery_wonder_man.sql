CREATE TABLE `email_verifications` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text(255) NOT NULL,
	`code` text(6) NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `email_verification_email_index` ON `email_verifications` (`email`);