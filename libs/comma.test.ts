import comma from "./comma";

describe("천 단위 , 붙이기", () => {
  test("100 -> 100", () => {
    expect(comma(100)).toBe("100");
  });
  test("1000 -> 1,000", () => {
    expect(comma(1000)).toBe("1,000");
  });
  test("10000 -> 10,000", () => {
    expect(comma(10000)).toBe("10,000");
  });
  test("100000 -> 100,000", () => {
    expect(comma(100000)).toBe("100,000");
  });
  test("1000000 -> 1,000,000", () => {
    expect(comma(1000000)).toBe("1,000,000");
  });
  test("10000000 -> 10,000,000", () => {
    expect(comma(10000000)).toBe("10,000,000");
  });
  test("-100 -> -100", () => {
    expect(comma(-100)).toBe("-100");
  });
  test("-1000 -> -1,000", () => {
    expect(comma(-1000)).toBe("-1,000");
  });
  test("-10000 -> -10,000", () => {
    expect(comma(-10000)).toBe("-10,000");
  });
  test("-100000 -> -100,000", () => {
    expect(comma(-100000)).toBe("-100,000");
  });
  test("-1000000 -> -1,000,000", () => {
    expect(comma(-1000000)).toBe("-1,000,000");
  });
  test("-10000000 -> -10,000,000", () => {
    expect(comma(-10000000)).toBe("-10,000,000");
  });
});
