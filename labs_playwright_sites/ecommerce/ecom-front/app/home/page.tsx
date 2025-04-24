import LandingPage from "@/src/components/landing/LandingPage";

export default function ItemPage({
  params,
}: {
  params: { itemId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const itemId = params.itemId;

  return (
    <div>
      <LandingPage/>
    </div>
  );
}
