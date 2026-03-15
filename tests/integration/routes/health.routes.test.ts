import app from "@/app";
import request from "supertest";
import { describe, expect, it } from "vitest";
import { config } from "@/config";

describe("Health Routes", () => {
  it("Should return 401 if AUTH_TOKEN is set and not provided", async () => {
    config.authToken = "test-token";
    const response = await request(app).get("/health");
    expect(response.statusCode).toBe(401);
  });

  it("Should return 200 if valid AUTH_TOKEN is provided", async () => {
    config.authToken = "test-token";
    const response = await request(app)
      .get("/health")
      .set("Authorization", "Bearer test-token");

    expect(response.statusCode).toBe(200);
  });

  it("Should return 200 if AUTH_TOKEN is not set", async () => {
    config.authToken = undefined;
    const response = await request(app).get("/health");
    expect(response.statusCode).toBe(200);
  });
});
