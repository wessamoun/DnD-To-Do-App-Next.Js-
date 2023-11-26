
import Body from "@/components/Body";
import Nav from "@/components/Nav";
import Quotes from "@/components/Quotes";



export default function Home() {
  
  return (
    <main className="h-screen overflow-auto">
      <Nav />
      <Quotes />
      <Body />
    </main>
  );
}
