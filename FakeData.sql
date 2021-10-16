CREATE TABLE users (
  "_id" serial NOT NULL,
  "name" varchar NOT NULL,
  "password" varchar NOT NULL,
  CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE songs (
  "_id" serial NOT NULL,
  "title" varchar NOT NULL,
  "artist" varchar NOT NULL,
  "album" varchar NOT NULL,
  "time_played" date NOT NULL,
  CONSTRAINT "songs_pk" PRIMARY KEY ("_id") 
) WITH (
  OIDS=FALSE
);

CREATE TABLE users_songs (
  "_id" serial NOT NULL,
  "user_id" serial NOT NULL,
  "song_id" serial NOT NULL,
  CONSTRAINT "users_songs_pk" PRIMARY KEY ("_id") 
) WITH (
  OIDS=FALSE
);

ALTER TABLE users_songs ADD CONSTRAINT "users_songs_fk0" FOREIGN KEY ("user_id") REFERENCES users("_id");
ALTER TABLE users_songs ADD CONSTRAINT "users_songs_fk1" FOREIGN KEY ("song_id") REFERENCES songs("_id");