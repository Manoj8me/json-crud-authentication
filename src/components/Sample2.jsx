import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./cart.css";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const [subtotal, setSubtotal] = useState(0); // State for overall subtotal
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const fetchCartItems = () => {
    axios.get('http://localhost:3032/orderedbooks')
      .then(response => {
        const orderedBooks = response.data || [];
        axios.get('http://localhost:3032/books')
          .then(res => {
            const books = res.data;
            setBooksData(books);

            // Combine cart items with book details
            const combinedData = orderedBooks.map(cartItem => {
              const book = books.find(book => book.bookid === cartItem.bookid);
              if (book) {
                return {
                  ...cartItem,
                  bookname: book.bookname,
                  author: book.author,
                  imgUrl: book["img-url"],
                  price: cartItem.price || book.price,
                  total: cartItem.price * cartItem.quantity // Calculate total for this book
                };
              }
              return cartItem;
            });

            setCartItems(combinedData);
            updateCartState(combinedData); // Update subtotal
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  };

  const updateCartState = (items) => {
    // Calculate subtotal by summing up individual totals
    const total = items.reduce((acc, item) => acc + item.total, 0);

    setSubtotal(total);

    // Prepare the data to update the backend
    const orderedBooks = items.map(item => ({
      bookid: item.bookid,
      quantity: item.quantity,
      price: item.price,
      total: item.total
    }));

    axios.put('http://localhost:3032/orderedbooks', {
      orderedbooks: orderedBooks,
      subtotal: total
    })
    .then(() => console.log('Cart updated with subtotal:', total))
    .catch(err => console.error(err));
  };

  const updateQuantity = (bookId, newQuantity) => {
    if (newQuantity < 1) return;

    const cartItem = cartItems.find(item => item.bookid === bookId);
    if (cartItem) {
      axios.put(`http://localhost:3032/orderedbooks/${cartItem.id}`, {
        bookid: cartItem.bookid,
        quantity: newQuantity,
        price: cartItem.price,
        total: cartItem.price * newQuantity // Update total for this book
      })
        .then(() => {
          fetchCartItems(); // Fetch updated cart items after changing quantity
        })
        .catch(err => console.error(err));
    }
  };

  const removeItem = (bookId) => {
    const cartItem = cartItems.find(item => item.bookid === bookId);
    if (cartItem) {
      axios.delete(`http://localhost:3032/orderedbooks/${cartItem.id}`)
        .then(() => {
          fetchCartItems(); // Fetch updated cart after removal
        })
        .catch(err => console.error(err));
    }
  };

  const placeOrder = () => {
    alert('Order placed successfully!');
    navigate("/orderplaced");
  };

  const goBackToBookDisplay = () => {
    navigate('/home');
  };

  return (
    <div className='cart-page'>
      <nav className='navbar'>
        <div className="navbar-brand">
          <Link className='logo-design'>BookParadise</Link>
        </div>
        <ul className="navbar-links8">
          <li>
            <button onClick={handleLogout} className='cart-btn'>LogOut</button>
          </li>
        </ul>
      </nav>
      <h2>Your Cart</h2>
      <div className='books-container'>
        {
          <table className='table table-bordered'>
            <thead className='bg-dark text-white'>
              <tr>
                <td>Serial No</td>
                <td>Book Image</td>
                <td>Book Title</td>
                <td>Author</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>Total (Price * Quantity)</td>
              </tr>
            </thead>
            <tbody>
              {
                cartItems.map((item, index) => (
                  <tr key={item.bookid}>
                    <td>{index + 1}</td>
                    <td>
                      {item.imgUrl && <img src={item.imgUrl} alt={item.bookname} className='card-img-top' />}
                    </td>
                    <td>{item.bookname}</td>
                    <td>{item.author}</td>
                    <td>{item.price}</td>
                    <td>
                      <button onClick={() => updateQuantity(item.bookid, item.quantity - 1)}>-</button>
                      {item.quantity}
                      <button onClick={() => updateQuantity(item.bookid, item.quantity + 1)}>+</button>
                      <button onClick={() => removeItem(item.bookid)}>Remove</button>
                    </td>
                    <td>{item.total}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        }
        <div className='mt-4'>
          <h4>Subtotal: ₹{subtotal.toFixed(2)}</h4>
          <button onClick={placeOrder} className='place-order-btn'>Place Order</button>
          <button onClick={goBackToBookDisplay} className='home-btn'>Back to HomePage</button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
