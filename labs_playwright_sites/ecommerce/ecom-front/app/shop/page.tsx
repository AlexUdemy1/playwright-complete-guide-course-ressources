'use client'

import ItemCard from "@/src/components/item/ItemCard";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function ItemPage({
  params,
}: {
  params: { itemId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const itemId = params.itemId;

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('http://localhost:3001/login/me', {
        method: 'GET',
        credentials: 'include',
      });
      if (!res.ok) {
        router.push('/login'); // Not logged in → redirect
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);
  if (loading) return <p>Loading shop...</p>;
  return (
    <div>
      <ItemCard/>
    </div>
  );
}
