"use client"
import FlightTable from "@/app/home/flight-table";
import Hero from "./home/hero";
import withAuth from "@/components/auth/withAuth";

function Home() {

  return (
    <main>
      <Hero />
      <FlightTable />
    </main>
  );
}

export default withAuth(Home);

