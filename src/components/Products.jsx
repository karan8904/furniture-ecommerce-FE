import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import ProductGrid from "./ProductGrid.jsx";

const Products = ({ _, products }) => {
  const productsLoading = useSelector(
    (state) => state.product.getProducts.loading
  );

  return (
    <>
      <Container>
        <Container sx={{ marginTop: "40px" }}>
          <ProductGrid products={products} productsLoading={productsLoading} />
        </Container>
      </Container>
    </>
  );
};

export default Products;
