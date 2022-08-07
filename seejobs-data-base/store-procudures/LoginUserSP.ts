export const LoginUserUp = 
`CREATE PROCEDURE login_user(in email varchar(255), in password varchar(255))
BEGIN
    declare id INT;
    declare uniqueId varchar(255);
    declare date_created datetime;
    declare userHash varchar(255);
    declare hash varchar(255);

    select u.Id, u.uniqueId, u.DateCreated, u.Hash into id , uniqueId , date_created , userHash from Users u where u.email = email;

    set hash = SHA2(CONCAT(date_created, email, password, id, uniqueId), 512);
    update Users u SET u.lastLogin = now() where u.Id = id;
    
    if(hash = userHash) then
        select id;
    else
        select 0;
    end if;
END`;

export const LoginUserDown = 'DROP PROCEDURE IF EXISTS login_user;';
