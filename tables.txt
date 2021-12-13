DROP TABLE IF EXISTS Favourites;
DROP TABLE IF EXISTS Recipe_Category;
DROP TABLE IF EXISTS RecipeIng;
DROP TABLE IF EXISTS Unit;
DROP TABLE IF EXISTS Rates;
DROP TABLE IF EXISTS Category;
DROP TABLE IF EXISTS Steps;
DROP TABLE IF EXISTS Ingredients;
DROP TABLE IF EXISTS Recipe;
DROP TABLE IF EXISTS Cookmas_User;


CREATE TABLE Cookmas_User
(
  Username VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Password CHAR(60) NOT NULL,
  Hometown VARCHAR(255) NOT NULL,
  ProfilePic TEXT NOT NULL,
  Role INT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (Username)
);

CREATE TABLE Recipe
(
  RecipeID INT NOT NULL AUTO_INCREMENT,
  File TEXT NOT NULL,
  RecipeName VARCHAR(255) NOT NULL,
  Description TEXT NOT NULL,
  CookTime INT NOT NULL,
  Username VARCHAR(255) NOT NULL,
  PRIMARY KEY (RecipeID),
  FOREIGN KEY (Username) REFERENCES Cookmas_User(Username)
);

CREATE TABLE Ingredients
(
  IngredientID INT NOT NULL AUTO_INCREMENT,
  IngredientName VARCHAR(255) NOT NULL,
  PRIMARY KEY (IngredientID)
);

CREATE TABLE Steps
(
  StepID INT NOT NULL AUTO_INCREMENT,
  StepDescription TEXT NOT NULL,
  RecipeID INT NOT NULL,
  PRIMARY KEY (StepID),
  FOREIGN KEY (RecipeID) REFERENCES Recipe(RecipeID)
);

CREATE TABLE Category
(
  CategoryID INT NOT NULL AUTO_INCREMENT,
  CategoryName VARCHAR(255) NOT NULL,
  PRIMARY KEY (CategoryID)
);

CREATE TABLE Rates
(
  RateID INT NOT NULL AUTO_INCREMENT,
  Rated INT NOT NULL,
  Username VARCHAR(255) NOT NULL,
  RecipeID INT NOT NULL,
  PRIMARY KEY (RateID),
  FOREIGN KEY (Username) REFERENCES Cookmas_User(Username),
  FOREIGN KEY (RecipeID) REFERENCES Recipe(RecipeID)
);

CREATE TABLE Unit
(
  UnitName CHAR(5) NOT NULL,
  PRIMARY KEY (UnitName)
);

CREATE TABLE RecipeIng
(
  RecipeIngID INT NOT NULL AUTO_INCREMENT,
  Quantity INT NOT NULL,
  UnitName CHAR(5) NOT NULL,
  IngredientID INT NOT NULL,
  RecipeID INT NOT NULL,
  PRIMARY KEY (RecipeIngID),
  FOREIGN KEY (UnitName) REFERENCES Unit(UnitName),
  FOREIGN KEY (IngredientID) REFERENCES Ingredients(IngredientID),
  FOREIGN KEY (RecipeID) REFERENCES Recipe(RecipeID)
);

CREATE TABLE Recipe_Category
(
  RecipeID INT NOT NULL,
  CategoryID INT NOT NULL,
  PRIMARY KEY (RecipeID, CategoryID),
  FOREIGN KEY (RecipeID) REFERENCES Recipe(RecipeID),
  FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID)
);

CREATE TABLE Favourites
(
  Username VARCHAR(255) NOT NULL,
  RecipeID INT NOT NULL,
  PRIMARY KEY (Username, RecipeID),
  FOREIGN KEY (Username) REFERENCES Cookmas_User(Username),
  FOREIGN KEY (RecipeID) REFERENCES Recipe(RecipeID)
);

INSERT INTO Cookmas_User (Username, Email, Password, Hometown, ProfilePic) 
VALUES
('Joulupukki', 'joulupukki@korvatunturi.fi', '1234', 'Rovaniemi', 
'https://im.mtv.fi/image/7646368/landscape16_9/1600/900/4678580b72d63463b0627ab101bcba02/zx/joulupukki-selfie.jpg');


--Reseptin lisäys

INSERT INTO Recipe (File, RecipeName, RecipeID, Description, CookTime, Username) 
VALUES (?, ?, ?, ?, ?, ?);

--Reseptin muokkaus

UPDATE Recipe 
SET 
File = ?, RecipeName = ?, Description = ?, CookTime = ?, 
WHERE RecipeID = ? AND Cookmas_User.Username = ?;

--Käyttäjän lisäys

INSERT INTO Cookmas_User (Username, email, password, Hometown, ProfilePic) 
VALUES (?, ?, ?, ?);

--Käyttäjän muokkaus

UPDATE Cookmas_User
SET
Username = ?, email = ?, password = ?, Hometown = ?, ProfilePic = ?;



