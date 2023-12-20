CREATE OR ALTER  PROCEDURE [dbo].[updateUserPassword]
	@user_id varchar(100),
	@newPassword varchar(100)
	
	as

set nocount on;

begin
	UPDATE dbo.users
	SET 
	password=@newPassword
	
	WHERE user_id = @user_id
end;