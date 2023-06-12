import { Product } from "./product";

describe("Product", () => {
  describe("functional", () => {
    it("should create an product instance", () => {
      expect(new Product()).toBeTruthy();
    });
  });
});
