import { execute, query } from "../services/dbconnect";
import { comparePass, hashPass } from "../services/passwordHash";
import { createPost, toggleLikePost } from "./postController";

jest.mock("../services/passwordHash.ts", () => ({
  hashPass: jest.fn(),
  comparePass: jest.fn(),
}));

// Mock the execute function
jest.mock("../services/dbconnect.ts", () => ({
  execute: jest.fn(),
  query: jest.fn(),
}));

describe("posts controller", () => {
  it("should create a post", async () => {
    // Arrange
    const req: any = {
      body: {
        created_by_user_id: "17c1f20d-72b8-4272-85b9-dc2102debbdc",
        caption: "This is my first Post",
      },
    } as any;

    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    (execute as jest.Mock).mockResolvedValue({});

    // Act
    await createPost(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Post created successfully",
    });
  });

  it("should like and unlike a post", async () => {
    const req: any = {
      body: {
        post_id: "b9189814-4ca7-487e-bda5-422f8c2ee014",
        user_id: "bd15993b-f1d5-4a44-8d5d-7d9f75d5d3a4",
      },
    };
    const res: any = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    (execute as jest.Mock).mockImplementation(
      async (procedure: string, params: any) => {
        if (procedure === "getlike") {
          // Simulate that the like exists
          return {
            recordset: [
              {
                /* Like details */
              },
            ],
          };
        } else if (procedure === "unLikePost") {
          // Simulate successful unlike
          return { rowsAffected: [1] };
        } else if (procedure === "likePost") {
          // Simulate successful like
          return { rowsAffected: [1] };
        }
      }
    );

    await toggleLikePost(req, res);

    expect(execute).toHaveBeenCalledWith("getlike", {
      user_id: "bd15993b-f1d5-4a44-8d5d-7d9f75d5d3a4",
      post_id: "b9189814-4ca7-487e-bda5-422f8c2ee014",
    });

    // Assuming the like exists, it will unlike in this case
    expect(execute).toHaveBeenCalledWith("unLikePost", {
      user_id: "bd15993b-f1d5-4a44-8d5d-7d9f75d5d3a4",
      post_id: "b9189814-4ca7-487e-bda5-422f8c2ee014",
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Post Unliked" });
  });
});
