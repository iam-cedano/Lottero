import TemplateDomain from "@/domains/template.domain";
import { describe, expect, it } from "vitest";

describe("TemplateDomain", () => {
  describe("isGlobalCommand", () => {
    it("should return true if the command is a global command", () => {
      const result = TemplateDomain.isGlobalCommand("edit");
      expect(result).toBe(true);
    });

    it("should return false if the command is not a global command", () => {
      const result = TemplateDomain.isGlobalCommand("local");
      expect(result).toBe(false);
    });
  });
});
