import './cart-dropdown.styles.scss'
import Button from '../button/button.component'

const CartDropdown = (props) => {

  return (<div className='cart-dropdown-container'>
    <div className='cart-items'>
      {/* {cartInfo["items"].map((item, i) => {
        <span>{i}</span>
      })} */}
    </div>
    <Button to='/checkout'>Go To Checkout</Button>
  </div >)
}

export default CartDropdown