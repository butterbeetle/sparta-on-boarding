import { render, screen } from "@testing-library/react";
import HomePage from "../pages/HomePage/HomePage";

test("renders HomePage correctly", () => {
  render(<HomePage />);
  const element = screen.getByText(/HomePage/i);
  expect(element).toBeInTheDocument();
});
