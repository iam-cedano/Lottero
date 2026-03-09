import spellingUtil from "@/utils/spelling.util";
import { describe, expect, it } from "vitest";

describe("Spelling util", () => {
  it("should capitalize the first letter of a string", () => {
    expect(spellingUtil.capitalizeFirstLetter("hello")).toBe("Hello");
  });
});
