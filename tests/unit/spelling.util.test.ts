import spellingUtil from "@/utils/spelling.util";
import { describe, expect, it } from "vitest";

describe("SpellingUtil.CapitalizeFirstLetter", () => {
  it("should capitalize the first letter of a string", () => {
    expect(spellingUtil.capitalizeFirstLetter("hello")).toBe("Hello");
  });
});
