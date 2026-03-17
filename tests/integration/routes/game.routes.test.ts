import app from "@/app";
import { config } from "@/config";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("Game Routes", () => {
  it("Should return 200 GET /games", async () => {
    const response = await request(app)
      .get("/games")
      .set("Authorization", `Bearer ${config.apiSecretKey}`);
    expect(response.status).toBe(200);
  });
});
