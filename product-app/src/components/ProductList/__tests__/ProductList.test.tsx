import { render, screen, waitFor } from "@testing-library/react";
import ProductList from "../ProductList";

const mockProducts = [
  {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    discountPercentage: 12.96,
    stock: 94,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
  },
  {
    id: 2,
    title: "iPhone X",
    description:
      "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899,
    discountPercentage: 17.94,
    stock: 34,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
  },
];

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

describe("ProductList Component", () => {
  it("renders product cards with correct details", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ products: mockProducts }),
    });

    render(<ProductList />);

    await waitFor(() => {
      mockProducts.forEach((product) => {
        expect(screen.getByText(product.title)).toBeInTheDocument();
        expect(
          screen.getByText(`Price: $${product.price}`)
        ).toBeInTheDocument();
      });
    });
  });
});
