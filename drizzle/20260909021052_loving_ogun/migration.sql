CREATE TABLE `events` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`category` enum('Technology & AI','Web Development','Design & UX','Startups & Biz') NOT NULL,
	`status` enum('Upcoming','Past','Feedback Open') NOT NULL DEFAULT 'Upcoming',
	`format` enum('Online','In-Person','Hybrid') NOT NULL DEFAULT 'In-Person',
	`venue` varchar(255) NOT NULL,
	`city` varchar(120) NOT NULL,
	`event_date` datetime NOT NULL,
	`cover_image` varchar(500) NOT NULL,
	`rating` float NOT NULL DEFAULT 0,
	`review_count` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `slug_unique` UNIQUE INDEX(`slug`)
);
--> statement-breakpoint
CREATE TABLE `feedback` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`event_id` int NOT NULL,
	`attendee_name` varchar(120) NOT NULL,
	`attendee_role` varchar(120),
	`overall_rating` int NOT NULL DEFAULT 5,
	`content_quality` int NOT NULL DEFAULT 5,
	`speaker_performance` int NOT NULL DEFAULT 5,
	`venue_logistics` int NOT NULL DEFAULT 5,
	`liked_most` text,
	`could_improve` text,
	`would_recommend` boolean NOT NULL DEFAULT true,
	`notes` text,
	`sentiment` enum('positive','neutral','negative') NOT NULL DEFAULT 'positive',
	`created_at` timestamp NOT NULL DEFAULT (now())
);
--> statement-breakpoint
CREATE INDEX `events_category_idx` ON `events` (`category`);--> statement-breakpoint
CREATE INDEX `events_status_idx` ON `events` (`status`);--> statement-breakpoint
CREATE INDEX `feedback_event_id_idx` ON `feedback` (`event_id`);--> statement-breakpoint
CREATE INDEX `feedback_created_at_idx` ON `feedback` (`created_at`);--> statement-breakpoint
ALTER TABLE `feedback` ADD CONSTRAINT `feedback_event_id_events_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE;