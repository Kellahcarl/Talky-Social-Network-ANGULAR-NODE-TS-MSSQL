import { execute, query } from "../services/dbconnect";
import { comparePass, hashPass } from "../services/passwordHash";
import { createComment } from "./commentController";


jest.mock("../services/passwordHash.ts", () => ({
  hashPass: jest.fn(),
  comparePass: jest.fn(),
}));

// Mock the execute function
jest.mock("../services/dbconnect.ts", () => ({
  execute: jest.fn(),
  query: jest.fn(),
}));

describe("follow controller", () => {
  it("should like a post", async () => {
    const req: any = {
      body: {
        post_id: "b9189814-4ca7-487e-bda5-422f8c2ee014",
        created_by_user_id: "bd15993b-f1d5-4a44-8d5d-7d9f75d5d3a4",
        comment: "This is my firsts comment dan @diana",
      },
    } as any;

    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    // Mock the execute function to simulate a successful registration
    (execute as jest.Mock).mockResolvedValue({});

    // Act
    await createComment(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Comment created successfully",
    });
  });
});
