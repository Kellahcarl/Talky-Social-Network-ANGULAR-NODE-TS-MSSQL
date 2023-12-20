CREATE or ALTER PROCEDURE getUserPosts
@user_id VARCHAR(100)

AS
BEGIN
    SELECT
        p.*,
        u.fullName ,
        u.user_name ,
        u.profileImage ,
        u.user_id AS created_by_user_id,
        COUNT(DISTINCT l.like_id) AS like_count,
        COUNT(DISTINCT c.comment_id) AS comment_count
    FROM
        posts p
    INNER JOIN
        users u ON p.created_by_user_id = u.user_id
    LEFT JOIN
        likes l ON p.post_id = l.post_id
    LEFT JOIN
        comment c ON p.post_id = c.post_id
    WHERE
        p.created_by_user_id = @user_id
    GROUP BY
        p.post_id, p.created_by_user_id, u.fullName, u.user_name, u.profileImage, u.user_id, p.caption, p.postImage, p.created_at, p.isDeleted;
END;