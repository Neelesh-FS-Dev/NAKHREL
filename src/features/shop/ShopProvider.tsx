import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { getProduct } from "../../data/products";
import type { CartLine } from "../../types/product";

/*
 * Demo cart and wishlist, persisted to localStorage. Stored data is untrusted
 * (it may be stale or hand-edited), so every entry is re-validated on read.
 */

const CART_KEY = "nakhrel:cart";
const WISHLIST_KEY = "nakhrel:wishlist";
const MAX_QTY = 10;

interface ShopState {
  cart: CartLine[];
  wishlist: string[];
}

type Action =
  | { type: "cart/add"; slug: string; quantity: number }
  | { type: "cart/set"; slug: string; quantity: number }
  | { type: "cart/remove"; slug: string }
  | { type: "wishlist/toggle"; slug: string };

interface ShopContextValue extends ShopState {
  addToCart: (slug: string, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  removeFromCart: (slug: string) => void;
  toggleWishlist: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
  cartCount: number;
  subtotal: number;
}

const clampQty = (n: number) => Math.min(MAX_QTY, Math.max(1, Math.floor(n)));

function readStorage<T>(key: string, parse: (raw: unknown) => T, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? parse(JSON.parse(raw)) : fallback;
  } catch {
    return fallback;
  }
}

const parseCart = (raw: unknown): CartLine[] => {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  return raw.flatMap((entry) => {
    if (typeof entry !== "object" || entry === null) return [];
    const { slug, quantity } = entry as Record<string, unknown>;
    if (typeof slug !== "string" || typeof quantity !== "number") return [];
    if (!getProduct(slug) || seen.has(slug)) return [];
    seen.add(slug);
    return [{ slug, quantity: clampQty(quantity) }];
  });
};

const parseWishlist = (raw: unknown): string[] => {
  if (!Array.isArray(raw)) return [];
  return [...new Set(raw)].filter(
    (slug): slug is string => typeof slug === "string" && Boolean(getProduct(slug)),
  );
};

function reducer(state: ShopState, action: Action): ShopState {
  switch (action.type) {
    case "cart/add": {
      const existing = state.cart.find((l) => l.slug === action.slug);
      if (!existing) {
        return { ...state, cart: [...state.cart, { slug: action.slug, quantity: clampQty(action.quantity) }] };
      }
      return {
        ...state,
        cart: state.cart.map((l) =>
          l.slug === action.slug ? { ...l, quantity: clampQty(l.quantity + action.quantity) } : l,
        ),
      };
    }
    case "cart/set":
      return {
        ...state,
        cart: state.cart.map((l) =>
          l.slug === action.slug ? { ...l, quantity: clampQty(action.quantity) } : l,
        ),
      };
    case "cart/remove":
      return { ...state, cart: state.cart.filter((l) => l.slug !== action.slug) };
    case "wishlist/toggle":
      return {
        ...state,
        wishlist: state.wishlist.includes(action.slug)
          ? state.wishlist.filter((s) => s !== action.slug)
          : [...state.wishlist, action.slug],
      };
  }
}

const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => ({
    cart: readStorage(CART_KEY, parseCart, []),
    wishlist: readStorage(WISHLIST_KEY, parseWishlist, []),
  }));

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
      window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(state.wishlist));
    } catch {
      // Storage can be full or disabled. The demo still works for this visit.
    }
  }, [state]);

  const addToCart = useCallback(
    (slug: string, quantity = 1) => dispatch({ type: "cart/add", slug, quantity }),
    [],
  );
  const setQuantity = useCallback(
    (slug: string, quantity: number) => dispatch({ type: "cart/set", slug, quantity }),
    [],
  );
  const removeFromCart = useCallback((slug: string) => dispatch({ type: "cart/remove", slug }), []);
  const toggleWishlist = useCallback((slug: string) => dispatch({ type: "wishlist/toggle", slug }), []);

  const value = useMemo<ShopContextValue>(() => {
    const subtotal = state.cart.reduce((sum, line) => sum + (getProduct(line.slug)?.price ?? 0) * line.quantity, 0);
    return {
      ...state,
      addToCart,
      setQuantity,
      removeFromCart,
      toggleWishlist,
      isWishlisted: (slug) => state.wishlist.includes(slug),
      cartCount: state.cart.reduce((sum, line) => sum + line.quantity, 0),
      subtotal,
    };
  }, [state, addToCart, setQuantity, removeFromCart, toggleWishlist]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop(): ShopContextValue {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
