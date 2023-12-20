CREATE OR ALTER PROCEDURE GetUserFollowCounts
    @user_id VARCHAR(100)
AS
BEGIN
    DECLARE @followersCount INT;
    DECLARE @followingsCount INT;

    -- Count of followers
    SELECT @followersCount = COUNT(*) 
    FROM user_followers 
    WHERE following_id = @user_id;

    -- Count of followings
    SELECT @followingsCount = COUNT(*) 
    FROM user_followers 
    WHERE follower_id = @user_id;

    -- Return the counts
    SELECT
        @followersCount AS followers,
        @followingsCount AS followings;
END;


EXEC GetUserFollowCounts @user_id="17c1f20d-72b8-4272-85b9-dc2102debbdc"
