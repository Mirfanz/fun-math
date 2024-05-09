import MabarCreaplineUI from "@/app/ui/game/creapline/mabar";
import { PageProps } from "@/type";

export default async function MabarCreaplinePage({
  params,
  searchParams,
}: PageProps) {
  const { roomCode } = params;
  console.log(params, searchParams);

  return <MabarCreaplineUI roomCode={roomCode} />;
}
