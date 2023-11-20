CREATE TABLE IF NOT EXISTS "product" (
	"id" serial PRIMARY KEY NOT NULL,
	"dato_id" varchar(36) NOT NULL,
	"rating_score" integer DEFAULT 0 NOT NULL,
	"rating_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_rating" (
	"user_id" uuid NOT NULL,
	"product_id" integer NOT NULL,
	"rating" varchar NOT NULL,
	"timestamp" timestamp NOT NULL,
	CONSTRAINT user_rating_user_id_product_id PRIMARY KEY("user_id","product_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "product_dato_id_idx" ON "product" ("dato_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_rating" ADD CONSTRAINT "user_rating_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_rating" ADD CONSTRAINT "user_rating_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
