import CardPrice from './CardPrice';
import CloudinaryImageSmall from './CloudinaryImageSmall';

const CartCard = ({ item, category, handleRemove, children }, props) => {
  return (
    <div className="rounded-br-4xl rounded-tl-4xl shadow-md shadow-zinc-950">
      <div
        className={`${props.className} bg-secondary timing flex w-full flex-col p-2 pr-4 clip-4 sm:pr-6`}
      >
        <div className="relative flex h-full items-center gap-4 sm:gap-8">
          {item?.picture && (
            <CloudinaryImageSmall
              className="size-20"
              url={item.picture?.imageUrl}
              alt={item?.name + ' ' + 'image'}
            />
          )}
          <h2 className={`${!item?.picture && 'py-5 pl-4'}`}>{item?.name}</h2>
          <div className="ml-auto flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex items-center justify-end gap-4">
              <CardPrice
                price={item?.price}
                category={category}
                itemId={item?.id}
                handleRemove={handleRemove}
              />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
