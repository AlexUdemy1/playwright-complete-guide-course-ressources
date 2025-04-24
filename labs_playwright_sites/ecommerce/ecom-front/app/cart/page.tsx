// app/cart/page.tsx
import CartPage from "./CartPage";

// Define the types for the props
interface ItemPageProps {
  params: { key: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export default function CartMainPage({ params, searchParams }: ItemPageProps) {
  return (
    <div className="h-[calc(100vh-4rem)]">
      <CartPage />
    </div>
  );
}
