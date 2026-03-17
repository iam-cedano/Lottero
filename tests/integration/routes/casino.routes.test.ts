import app from "@/app";
import { config } from "@/config";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("Casino Routes", () => {
  it("Should return 200 GET /casinos", async () => {
    const response = await request(app)
      .get("/casinos")
      .set("Authorization", `Bearer ${config.apiSecretKey}`);
    expect(response.status).toBe(200);
  });
});
