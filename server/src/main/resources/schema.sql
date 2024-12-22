DROP TABLE IF EXISTS "gardens";

DROP SEQUENCE  IF EXISTS GardensIdSeq;
CREATE SEQUENCE  GardenIdSeq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372836854775807 CACHE 1;

CREATE TABLE "gardens"(
  "Id" bigint DEFAULT nextval('GardenIdSeq') NOT NULL,
  "Name" text,
  "UserId" bigint,
  "CreationDate" date


);