DROP TABLE "todo";

CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
  	"complete" VARCHAR (3) NOT NULL
);


INSERT INTO "todo" ("id", "task", "complete") 
VALUES ( 1, 'Clean the bathroom', 'No'), (2, 'Sweep the floor', 'No'), (3, 'Take out the trash', 'No'), (4, 'Clean the car', 'No');
