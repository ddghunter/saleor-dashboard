import { TokenArray } from ".";

describe("ConditionalFilter / ValueProvider / TokenArray", () => {
  it("should parse empty params", () => {
    // Arrange
    const url = new TokenArray("");
    // Act
    const fetchingParams = url.getFetchingParams();
    // Assert
    expect(fetchingParams).toEqual({
      category: [],
      collection: [],
      channel: [],
      productType: [],
      attribute: {},
    });
  });

  it("should parse params with values", () => {
    // Arrange
    const params = new URLSearchParams({
      "0[s0.price]": "123",
      "1": "AND",
      "2[s0.channel]": "channel-pln",
      "3": "OR",
      "4[s2.collection][0]": "featured-products",
      "5": "AND",
      "6[s0.productType]": "beer",
      "7": "AND",
      "8[s2.category][0]": "accessories",
      "9[s2.category][1]": "groceries",
      "10": "AND",
      "11[o2.bottle-size][0]": "attribute-id",
    });
    // Act
    const url = new TokenArray(params.toString());
    const fetchingParams = url.getFetchingParams();
    // Assert
    expect(fetchingParams).toEqual({
      attribute: {
        "bottle-size": ["attribute-id"],
      },
      category: ["accessories", "groceries"],
      channel: ["channel-pln"],
      collection: ["featured-products"],
      productType: ["beer"],
    });
  });
});
