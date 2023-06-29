Group project carried out in Trybe's back-end module.

**(Administrator screen styling not finalized yet)**

This application allows communication between customers and sellers. Customers can place orders through a shopping cart, and salespeople have the ability to approve, prepare, and ship those orders. After the customer receives the product, he can mark the order as received. Both parties have access to specific details of their orders.

To make it easier to understand, we can divide the application into flows, along with a status validation between customer and seller, in addition to testing coverage on both front-end and back-end:

Common Flow:

     (1) Login Screen;
     (2) Registration Screen;

Customer Flow:

     (3) Product Screen;
     (4) Checkout Screen;
     (5) Order Screen;
     (6) Order Details Screen;

Flow of the Seller Person:

     (7) Order Screen;
     (8) Order Details/Control Screen;

Order Status Validation:

     (9) Status test without real-time update;
     (10) Status test with real-time update;

Management Person Flow:

     (11) User management screen;

Flow of the Seller Person:

     (12) Coverage tests.

<details>
   <summary><strong>How to run the project</strong></summary>
    
- `npm install` in the root of the project, inside back-end/ and front-end/;
- `docker compose up -d` in the root of the project;
- `npm run db:reset` in the root of the project;
- `localhost:3000` in the browser;
 
</details>

<details>
   <summary><strong>Technologies used</strong></summary>
  
- `Node.js`
- `Express`
- `React`
- `Context API`
- `Sequel`
- `MySql`
- `MSC Architecture`

</details>

<details>
   <summary><strong>Responsible Dev</strong></summary>
  
- [@victorftw](https://github.com/victorftw)
- [@titi0001](https://github.com/titi0001)
- [@tiagohasse](https://github.com/tiagohasse)
- [@Gustavo-Aquino-1](https://github.com/Gustavo-Aquino-1)

</details>
