import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import allProducts from "./mocks/productsMocks";
import renderWithRouter from "./helpers/RenderWithRouter";
import CustomerProducts from "../pages/CustomerProducts";
import users01 from './mocks/users01'

describe("Tela de Produtos", () => {
  beforeEach(() => {
    localStorage.clear();
    Jest.resetAllMocks();
    localStorage.setItem('user', JSON.stringify(users01[2]));
  });

  // it("Verifica se os produtos são renderizados na tela", async () => {
  //   renderWithRouter(<CustomerProducts />);

  //   const products = allProducts.map(({ name }) => name);

  //   await waitFor(() => {
  //     products.forEach((name) => {
  //       expect(screen.getByRole("heading", { name })).toBeInTheDocument();
  //     });
  //   });
  // });
});
