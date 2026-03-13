import app from "@/app";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("Channel Message Routes", () => {
  it("Should return 200 GET /channel-messages", async () => {
    const response = await request(app).get("/channel-messages");
    expect(response.status).toBe(200);
  });
});
