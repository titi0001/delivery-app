import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../contextAPI/context';
import Navbar from './components/Navbar';
import useLocalStorage from '../hooks/useLocalStorage';
import { requestProducts, setToken } from '../services';

function CustomerProducts() {
  const { state: user } = useLocalStorage('user', []);
  const history = useHistory();
  const { productsArray, setProducts } = useContext(Context);
  const { totalValue, setTotalValue } = useContext(Context);
  const { setCartProducts } = useContext(Context);
  const totalPrice = productsArray.map((item) => Number(item.totalValue));

  useEffect(() => {
    setTotalValue(
      totalPrice.reduce((acc, current) => acc + current, 0).toFixed(2),
    );
  }, [totalPrice]);

  useEffect(() => {
    const fetchProducts = async () => {
      setToken(user.token);
      const products = await requestProducts();

      products.forEach((item) => {
        item.quantity = 0;
        item.totalValue = 0;
      });
      setProducts(products);
    };
    fetchProducts();
  }, [setProducts]);

  useEffect(() => {
    const cartProductsToAlter = productsArray
      .filter((product) => product.quantity > 0)
      .sort((a, b) => a.id - b.id);
    setCartProducts(cartProductsToAlter);
  }, [productsArray, setCartProducts]);

  const subtractItem = (id) => {
    const numberId = +id;
    const productsToAlter = [...productsArray];
    const element = productsToAlter.find((item) => +item.id === +numberId);
    if (element.quantity > 0) {
      element.quantity -= 1;
      element.totalValue = (element.quantity * +element.price).toFixed(2);
      setProducts(productsToAlter);
    }
  };

  const handleChange = (e) => {
    const numberId = +e.target.id;
    const quantity = +e.target.value;
    const productsToAlter = [...productsArray];
    const element = productsToAlter.find((item) => +item.id === +numberId);
    element.quantity = quantity;
    element.totalValue = (element.quantity * +element.price).toFixed(2);
    setProducts(productsToAlter);
  };

  function addItem(id) {
    const numberId = +id;
    const productsToAlter = [...productsArray];
    const element = productsToAlter.find((item) => +item.id === +numberId);
    element.quantity += 1;
    element.totalValue = (element.quantity * +element.price).toFixed(2);
    setProducts(productsToAlter);
  }

  const disableButtton = () => {
    const equalZero = totalPrice.map((item) => item !== 0);
    return equalZero.includes(true);
  };

  return (
    <div>
      <Navbar />
      <main>
        {productsArray.map((products) => (
          <div key={ products.id }>
            <img
              src={ products.urlImage }
              alt={ products.name }
              height="300px"
              data-testid={ `customer_products__img-card-bg-image-${products.id}` }
            />

            <h2
              data-testid={ `customer_products__element-card-title-${products.id}` }
            >
              {products.name}
            </h2>

            <p
              data-testid={ `customer_products__element-card-price-${products.id}` }
            >
              {`R$ ${parseFloat(products.price).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
              })}`}
            </p>

            <div>
              <button
                type="button"
                id={ products.id }
                data-testid={ `customer_products__button-card-rm-item-${products.id}` }
                onClick={ (e) => subtractItem(e.target.id) }
              >
                -
              </button>

              <input
                type="number"
                data-testid={ `customer_products__input-card-quantity-${products.id}` }
                placeholder="0"
                id={ products.id }
                value={ products.quantity }
                min={ 0 }
                onChange={ (e) => handleChange(e) }
              />

              <button
                type="button"
                onClick={ (e) => addItem(e.target.id) }
                id={ products.id }
                data-testid={ `customer_products__button-card-add-item-${products.id}` }
              >
                +
              </button>
            </div>
          </div>
        ))}
      </main>
      <footer>
        <button
          type="button"
          data-testid="customer_products__button-cart"
          disabled={ !disableButtton() }
          onClick={ () => history.push('/customer/checkout') }
        >
          <p data-testid="customer_products__checkout-bottom-value">
            {`${parseFloat(totalValue).toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
            })}`}
          </p>
        </button>
      </footer>
    </div>
  );
}

export default CustomerProducts;
