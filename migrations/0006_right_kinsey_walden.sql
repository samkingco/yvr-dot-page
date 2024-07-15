CREATE TABLE `weather` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`description` text(240) NOT NULL,
	`temp` integer NOT NULL,
	`feels_like` integer NOT NULL,
	`min` integer NOT NULL,
	`max` integer NOT NULL,
	`pressure` integer NOT NULL,
	`humidity` integer NOT NULL,
	`sunrise` integer NOT NULL,
	`sunset` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `weather_id_index` ON `weather` (`id`);