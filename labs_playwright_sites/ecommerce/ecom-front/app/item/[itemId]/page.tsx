import ItemSummary from "@/src/components/item/ItemSummary";

export default function ItemPage({
  params,
}: {
  params: { itemId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const itemId = params.itemId;

  return (
    <div>
      <ItemSummary productId={itemId} />
    </div>
  );
}
