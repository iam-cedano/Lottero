import app from "@/app";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("Channel Routes", () => {
  it("Should return 200 GET /channels", async () => {
    const response = await request(app).get("/channels");
    expect(response.status).toBe(200);
  });
});
