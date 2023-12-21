import { execute, query } from "../services/dbconnect";
import { comparePass, hashPass } from "../services/passwordHash";
import { followUser } from "./followController";


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
            follower_id: "d082eaa9-4d37-4546-b207-af9e28b114e7",
            following_id: "bec867cb-dcaa-42f3-9847-ad07dbdb9c6c",
          },
        } as any;

        const res: any = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        } as any;

        // Mock the execute function to simulate a successful registration
        (execute as jest.Mock).mockResolvedValue({});

        // Act
        await followUser(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          message: "User followed successfully",
        });
     })
 })