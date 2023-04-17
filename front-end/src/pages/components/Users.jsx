import React, { useState, useEffect, useContext } from 'react';
import Context from '../../contextAPI/context';
import { deleteUser, requestUser, setToken } from '../../services';

const resolveError = 1;

function Users() {
  const { newUserRegisterByAdmin } = useContext(Context);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user'));
    const { token } = data;
    async function fetchUsers() {
      setToken(token);
      const response = await requestUser();
      setUsers(await response);
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user'));
    const { token } = data;
    async function fetchUsers() {
      if (newUserRegisterByAdmin) {
        setToken(token);
        const response = await requestUser();
        setUsers(await response);
      }
    }

    fetchUsers();
  }, [newUserRegisterByAdmin]);

  const handleDeleteUser = async (id) => {
    const adminData = JSON.parse(localStorage.getItem('user'));
    const { token } = adminData;

    setToken(token);
    await deleteUser(id);

    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div
      data-testid="customer_element-order-table"
    >
      <div>
        <h3>Lista de usuários</h3>
        <table>
          <thead>
            <tr>
              {resolveError && (
                <>
                  <th>Item</th>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Tipo</th>
                  <th>Excluir</th>
                </>
              )}
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={ index + 1 }
              >
                <td
                  data-testid={ `admin_manage__element-user-table-item-number-${index}` }
                >
                  { index + 1 }
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-name-${index}` }
                >
                  { user.name }
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-email-${index}` }
                >
                  { user.email }
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-role-${index}` }
                >
                  { user.role }
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-remove-${index}` }
                >
                  <button
                    type="button"
                    onClick={ () => handleDeleteUser(user.id) }
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
