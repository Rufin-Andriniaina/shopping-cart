import CartBouton from "./CartBouton"

const CartItem = ({item, fromCart}) => {
    const {id, name, imageURL, price } = item
  return (
    <div key={id} className='group flex flex-col gap-y-2 border border-zinc-300 rounded-md p-20  bg-white relative'>
       <img className={` ${!fromCart && "group-hover:translate-y-2 transition-all"}  duration-500`} width={300} height={300} src={imageURL} alt={name} /> 
       <div className="absolute bottom-5 left-5">
        <p className={`xl:text-base md:text-base text-xs text-zinc-700 ${fromCart && "text-sm"}`}> {name} </p>
        <span className={`lg:text-md md:text-sm text-xs font-semibold ${fromCart && "text-sm"} text-pink-400`}> ${price} </span>
       </div>
       <CartBouton item={item} fromCart={fromCart} />
    </div>
  )
}

export default CartItem