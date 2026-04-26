import app from "@/app";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("Messages Routes", () => {

    it("should throw an error when creating a message", async () => {
        const response = await request(app)
            .post("/messages")
            .send({ content: "Test message" });

        expect(response.statusCode).toBe(401);
    });

});