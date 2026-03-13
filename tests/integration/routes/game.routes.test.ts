import app from "@/app";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("Game Routes", () => {
  it("Should return 200 GET /games", async () => {
    const response = await request(app).get("/games");
    expect(response.status).toBe(200);
  });
});
