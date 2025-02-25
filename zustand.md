# Zustand Notes

```ts
import create from "zustand";

type Store = {
    count: number;
    increment: () => void;
    decrement: () => void;
};

const useStore = create<Store>((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
}));

export default useStore;
```

**Now that we’ve created a store, we can use it in our components like this:**

```ts
import useStore from "./useStore";

function Counter() {
    const { count, increment, decrement } = useStore();
    return (
        <div>
            <button onClick={decrement}>-</button>
            <span>{count}</span>
            <button onClick={increment}>+</button>
        </div>
    );
}

export default Counter;
```

```ts
import create, { GetState, SetState } from "zustand";

interface Item {
    id: number;
    name: string;
    price: number;
}

interface Store {
    items: Item[];
    addItem: (item: Item) => void;
    removeItem: (id: number) => void;
    totalPrice: () => number;
}

const useCartStore = create<Store>(
    (set: SetState<Store>, get: GetState<Store>) => ({
        items: [],
        addItem: (item: Item) =>
            set((state) => ({ items: [...state.items, item] })),
        removeItem: (id: number) =>
            set((state) => ({
                items: state.items.filter((item) => item.id !== id),
            })),
        totalPrice: () =>
            get().items.reduce((total, item) => total + item.price, 0),
    })
);

export default useCartStore;
```

## How to use

```ts
import useCartStore from "./useStore";

interface CartProps {}

export const Cart: FC<CartProps> = () => {
    const items = useCartStore((state) => state.items);
    const totalPrice = useCartStore((state) => state.totalPrice());
    return (
        <div>
            <h2>Cart</h2>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <span>{item.name}</span>
                        <span>{item.price}</span>
                        <button
                            onClick={() =>
                                useCartStore.getState().removeItem(item.id)
                            }
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            <p>Total Price: {totalPrice}</p>
        </div>
    );
};

interface AppProps {}

export const App: FC<AppProps> = () => {
    const addItem = useCartStore((state) => state.addItem);
    const handleAddItem = () => {
        const newItem = {
            id: Date.now(),
            name: "Item",
            price: Math.floor(Math.random() * 10) + 1,
        };
        addItem(newItem);
    };
    return (
        <div>
            <h1>Shopping App</h1>
            <button onClick={handleAddItem}>Add Item</button>
            <Cart />
        </div>
    );
};
```
