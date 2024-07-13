CREATE TABLE `people` (
	`username` text(32) PRIMARY KEY NOT NULL,
	`name` text(80),
	`does` text(80) NOT NULL,
	`website` text(255) NOT NULL,
	`bio` text(240) NOT NULL
);
