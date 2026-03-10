import app from "@/app";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("Channel Group Routes", () => {
  it("Should return 200", async () => {
    const response = await request(app).get("/message");

    expect(response.statusCode).toBe(200);
  });
});
