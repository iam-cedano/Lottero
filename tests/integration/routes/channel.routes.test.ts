import app from "@/app";
import request from "supertest";
import { describe, expect, it } from "vitest";
import { config } from "@/config";

describe("Channel Routes", () => {
  it("Should return 200 GET /channels", async () => {
    const response = await request(app)
      .get("/channels")
      .set("Authorization", `Bearer ${config.apiSecretKey}`);

    expect(response.status).toBe(200);
  });
});
