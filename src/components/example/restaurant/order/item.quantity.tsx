import { useCurrentApp } from "@/context/app.context";
import { router } from "expo-router";
import ItemSingle from "./item.single";

interface IProps {
   menuItem: IMenuItem;
   restaurant: IRestaurant | null;
   isModal: boolean;
}

const ItemQuantity = (props: IProps) => {
   const { menuItem, restaurant, isModal } = props;
   const { cart, setCart } = useCurrentApp();

   const handlePressItem = (item: IMenuItem, action: "MINUS" | "PLUS") => {
      // console.log(item, action);
      if (item.options.length && isModal === false) {
         router.navigate({
            pathname: action === 'PLUS' ? '/product/create.modal' : '/product/update.model',
            params: { menuItemId: menuItem._id }
         });
      } else {
         if (restaurant?._id) {
            const total = action === "MINUS" ? -1 : 1;

            if (!cart[restaurant._id]) {
               // Initialize cart for the restaurant
               cart[restaurant._id] = {
                  sum: 0,
                  quantity: 0,
                  items: {}
               }
            }
            // process
            cart[restaurant._id].sum = cart[restaurant._id].sum + total * item.basePrice;
            cart[restaurant._id].quantity = cart[restaurant._id].quantity + total;

            // inspect product in cart
            if (!cart[restaurant._id].items[item._id]) {
               cart[restaurant._id].items[item._id] = {
                  data: menuItem,
                  quantity: 0
               };
            }

            cart[restaurant._id].items[item._id] = {
               data: menuItem,
               quantity: cart[restaurant._id].items[item._id].quantity + total
            };

            if ((cart[restaurant._id].items[item._id].quantity) <= 0) {
               delete cart[restaurant._id].items[item._id];
            }

            // console.log(cart);
            setCart((prevState: any) => ({ ...prevState, ...cart }));
         }
      }
   }

   let showMinus = false;
   let quantity = 0;
   if (restaurant?._id) {
      const store = cart[restaurant?._id!];
      if (store?.items && store?.items[menuItem?._id]) {
         showMinus = true;
         quantity = store.items[menuItem?._id].quantity;
      }
   }

   return (
      <>
         <ItemSingle 
            menuItem={menuItem}
            showMinus={showMinus}
            quantity={quantity}
            handlePressItem={handlePressItem}
         />
      </>
   )
}

export default ItemQuantity;