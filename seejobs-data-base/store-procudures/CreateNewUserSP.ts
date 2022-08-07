export const CreateNewUserUp = 
`CREATE PROCEDURE create_user(in name varchar(255), in email varchar(255), in password varchar(255))
BEGIN
	declare date_now datetime;
	declare uniqueId varchar(255);
   declare id int;
   declare hash varchar(255);
   
   set date_now = now();
	set uniqueId = UUID();
	
	insert into Users (Name, Hash, Email, uniqueId, DateCreated) values (name, '', email, uniqueId, date_now);
   set id = LAST_INSERT_ID();
   set hash = SHA2(CONCAT(date_now, email, password, id, uniqueId), 512);

   update Users u set u.Hash = hash where u.Id = id;

   select id, uniqueId;
END`;

export const CreateNewUserDown = 'DROP PROCEDURE IF EXISTS create_user;';
