
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);


-- PostgreSQL queries below for Project

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "email" VARCHAR (100),
    "phone_number" VARCHAR (50),
    "postal_code" INTEGER
);

DROP TABLE "user";
DROP TABLE "category";
DROP TABLE "product";
DROP TABLE "status";
DROP TABLE "buying_table";

CREATE TABLE "category" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"category_type" VARCHAR(50) NOT NULL
);

CREATE TABLE "product" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"user_id" INT REFERENCES "user" NOT NULL,
	"status_id" INT REFERENCES "status" NOT NULL,
	"image_url" VARCHAR(255),
	"name" VARCHAR(125) NOT NULL,
	"price" INT,
	"description" VARCHAR(125) NOT NULL,
	"created_date" TIMESTAMP,
	"category_id" INT REFERENCES "category" NOT NULL
);

CREATE TABLE "status" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"status_type" VARCHAR(25) NOT NULL
);

CREATE TABLE "bookmark" (
		"id" SERIAL PRIMARY KEY NOT NULL,
		"user_id" INT REFERENCES "user" NOT NULL,
		"product_id" INT REFERENCES "product" NOT NULL);

INSERT INTO "category" ("category_type")
			VALUES ('Trading cards'), ('Comic books'), ('Collectible toys & figurines'),
			('Plush toys'), ('Video games'), ('Board games'), ('Sports memorabilia'), 
			('Paper ephemera'), ('Coin & Currency'), ('Vintage & Antique'), 
			('Books, Movies, Music'); 
			
INSERT INTO "status" ("status_type")
			VALUES ('Active'), ('Inactive'), ('Pending'), ('Sold');
			
INSERT INTO "product" ("user_id", "status_id", "image_url","name", "price", "description", "created_date", "category_id")
			VALUES ('1', '1', 'images/bd-Dark-Tower-375.jpg', 'Dark Towers', '375', '1 to 4 players classic electronic board game', current_timestamp,'6'),
				('1', '1', 'images/bd-monopoly-500.jpg','Monopoly', '500', '3d monopoly only a few out there', current_timestamp,'6'),
				('1', '1', 'images/bd-risk40thedition300.jpg','Risk', '325', '40th anniversary limited edition', current_timestamp,'6'),
				('1', '1', 'images/bd-Star-Wars--The-Queens-Gambit-500.jpg', 'Star wars, queens gambit', '525', 'Very hard to find queens gambit', current_timestamp,'6'),
				('1', '1', 'images/bd-War-Of-The-Ring-Collectors-Edition-1500.jpg', 'War of the rings', '1500', 'Collectors edition', current_timestamp, '6');
			
-- SELECT ALL FROM PRODUCT JOINED BOOKMARK AND USER
SELECT *			
FROM "product" JOIN "bookmark"
ON "product".id = "bookmark".product_id
JOIN "user" ON "bookmark".user_id = "user".id;

-- JOIN ONLY PRODUCT, BOOKMARK AND USER
SELECT "bookmark".id, "bookmark".product_id, "product".image_url, "product".name, "product".price, "product".description			
FROM "product" JOIN "bookmark"
ON "product".id = "bookmark".product_id
JOIN "user" ON "bookmark".user_id = "user".id;

-- FIND ALL IN BOOKMARK for only 1 user, referencing seller id
SELECT "bookmark".id, "bookmark".user_id, "bookmark".product_id, "product".image_url, "product".name, "product".price, "product".description, "category".category_type, "status".status_type			
FROM "product" JOIN "bookmark"
ON "product".id = "bookmark".product_id
JOIN "user" ON "bookmark".user_id = "user".id
JOIN "category" ON "category".id = "product".category_id
JOIN "status" ON "status".id = "product".status_id
WHERE "bookmark".user_id = 1;

SELECT "bookmark".id, "product".user_id, "bookmark".product_id, "product".image_url, "product".name, "product".price, "product".description, "category".category_type, "status".status_type			
  FROM "product" JOIN "bookmark"
  ON "product".id = "bookmark".product_id
  JOIN "user" ON "bookmark".user_id = "user".id
  JOIN "category" ON "category".id = "product".category_id
  JOIN "status" ON "status".id = "product".status_id
  WHERE "product".id = 44;

-- FULL JOIN, FOR BOOKMARK TO FIND ALL RELEVANT INFO
SELECT "bookmark".id, "bookmark".user_id, "bookmark".product_id, "product".image_url, "product".name, "product".price, "product".description, "category".category_type, "status".status_type			
FROM "product" JOIN "bookmark"
ON "product".id = "bookmark".product_id
JOIN "user" ON "bookmark".user_id = "user".id
JOIN "category" ON "category".id = "product".category_id
JOIN "status" ON "status".id = "product".status_id
WHERE "bookmark".product_id = 25;

-- DELETE FROM BOOKMARKS
DELETE FROM "bookmark" WHERE "id" = 48;

-- SELECT ONLY THE USER
SELECT * FROM "user" WHERE "id" = 1;

-- FOR MARKETPLACE, SELECT INFORMATION AND ORDER ASC
SELECT  "product".id, "product".user_id, "product".image_url, "product".name, "product".price, "product".description, "category".category_type, "status".status_type, "product".created_date
FROM "product" JOIN "category"
ON "product".category_id = "category".id
JOIN "status" ON "status".id = "product".status_id
ORDER BY "product".created_date ASC;

-- SELECT ALL FROM PRODUCT WHERE PRODUCT ID IS EQUAL
SELECT * FROM "product" WHERE "product".id = 21;

-- WHERE PRODUCT ID IS EQUAL
SELECT  "product".id, "product".user_id, "product".image_url, "product".name, "product".price, "product".description, "category".category_type, "status".status_type, "product".created_date
  FROM "product" JOIN "category"
  ON "product".category_id = "category".id
  JOIN "status" ON "status".id = "product".status_id
  WHERE "product".id = 21;

-- SELECT ALL FROM ONLY PRODUCT WHERE PRODUCT USER ID IS EQUAL
SELECT * FROM "product" WHERE "product".user_id = 3;

-- WHERE USER ID IS EQUAL
  SELECT  "product".id, "product".user_id, "product".image_url, "product".name, "product".price, "product".description, "category".category_type, "status".status_type, "product".created_date
  FROM "product" JOIN "category"
  ON "product".category_id = "category".id
  JOIN "status" ON "status".id = "product".status_id
  WHERE "product".user_id = 21;
  
  -- SELECT ALL CATEGORY TYPES
  SELECT * FROM "category";
  
  SELECT *
  FROM "product" JOIN "category"
  ON "product".category_id = "category".id;
  
  
  --SELECT ALL STATUS TYPES
  SELECT * FROM "status";

-- QUERY TO UPDATE AN EXISTING ROW
UPDATE "product"
SET "status_id" = '2',
"image_url" = 'images/bd-Dark-Tower-375.jpg',
"name" = 'dark towers',
"price" = '475',
"description" = 'correction: 1-4 players electronic board game',
"category_id" = '5'
WHERE "product".id = 21;


INSERT INTO "product" ("user_id", "status_id", "image_url","name", "price", "description", "created_date", "category_id")
VALUES ('4', '3', 'images/book-charlie-chocolatefacotry-1500.jpg', 'Charlie in the Chocolate Factory', '1500', 'fair condition of 1st edition CITCF book', current_timestamp,'11');

DELETE FROM "product" WHERE "id" = 33;


INSERT INTO "product" ("user_id", "status_id", "image_url","name", "price", "description", "created_date", "category_id")
			VALUES ('1', '1', 'images/comic-redravencomic1200.jpg', 'Red Raven Comics', '1200', 'Super Rare comic', current_timestamp,'2'),
			('1', '1', 'images/comic-starmanfirstappearance500.jpg', 'StarMan', '500', '1st appearance with this comic series', current_timestamp,'2'),
			('1', '1', 'images/comic-waltdisneycomic400.jpg', 'Walt Disney Comics', '400', 'rough condition but 1st edition', current_timestamp,'2'),
			('1', '1', 'images/comic-wonderman300.jpg', 'Wonderman Comics', '300', 'Truly great comic!', current_timestamp,'2'),
			('1', '1', 'images/comicnewbookcommics1000.jpg', 'New Comics 2nd release 1st edition', '1000', 'Great heroes', current_timestamp,'2'),
			('1', '1', 'images/fpbluebatman3650.jpg', 'Blue batman', '3650', 'Only 200 available', current_timestamp,'3'),
			('1', '1', 'images/fpbonedaddy2000.jpg', 'Bone Daddy', '2000', 'Super rare version of Bone Daddy Funko Pop', current_timestamp,'3'),
			('1', '1', 'images/fpdumo5000.jpg', 'Dumbo', '5000', 'Dumbo clown, only a few out there', current_timestamp,'3'),
			('1', '1', 'images/fpdumo5000.jpg', 'Dumbo', '5000', 'Dumbo clown, only a few out there', current_timestamp,'3'),
			('1', '1', 'images/fpfreddyfunko3500.jpg', 'Freddy Funko', '3500', 'Super rare made back early days of Funko Pop', current_timestamp,'3');
			
				

