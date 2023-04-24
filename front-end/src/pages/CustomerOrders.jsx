import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from './components/Navbar';
import { requestFindUser, requestUser, setToken } from '../services';

function CustomerOrders() {
  const [user] = useState(() => JSON.parse(localStorage.getItem('user')) || {});
  const [sales, setSales] = useState();
  const { push } = useHistory();

  const handleClick = (id) => {
    push(`/customer/orders/${id}`);
  };

  useEffect(() => {
    const load = async () => {
      const users = await requestUser();
      // const users = await responseUser;
      const findUser = users.find((e) => e.email === user.email);
      console.log(findUser);

      setToken(user.token);
      const allSales = await requestFindUser(findUser.id);

      setSales(allSales);
    };
    load();
  }, [user.email, user.token]);

  return (
    <>
      <Navbar />
      <div>
        {sales?.map((element) => (
          <div key={ element.id }>
            <button
              type="button"
              onClick={ () => handleClick(element.id) }
              style={ { backgroundColor: 'transparent', border: 'none' } }
            >
              <p
                data-testid={ `customer_orders__element-order-id-${element.id}` }
              >
                {`Pedido ${element.id}`}
              </p>
              <p
                data-testid={ `customer_orders__element-delivery-status-${element.id}` }
              >
                {element.status}
              </p>
              <p
                data-testid={ `customer_orders__element-order-date-${element.id}` }
              >
                {`${String(new Date(element.saleDate).getUTCDate()).padStart(
                  2,
                  '0',
                )}/${String(
                  new Date(element.saleDate).getUTCMonth() + 1,
                ).padStart(2, '0')}/${new Date(
                  element.saleDate,
                ).getFullYear()}`}
              </p>
              <p
                data-testid={ `customer_orders__element-card-price-${element.id}` }
              >
                {`${String(element.totalPrice).replace('.', ',')}`}
              </p>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default CustomerOrders;
