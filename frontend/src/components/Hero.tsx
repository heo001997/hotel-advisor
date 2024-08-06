import {OptimalOptionForm} from "@/components/OptimalOptionForm.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shadcnui/components/ui/card.tsx";
import {Table, TableHeader, TableRow, TableCell, TableHead, TableBody} from "@/shadcnui/components/ui/table.tsx"
import {useEffect, useState} from "react";

interface Accommodation {
  room_type: number;
  sleeps: number;
  room_count: number;
  price: number;
}

export const Hero = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([])

  useEffect(
    function loadAccommodationOverview() {
      fetch('http://localhost:3000/accommodations')
        .then(res => {
          if (res.ok) return res.json()
          throw new Error('Network response was not ok')
        })
        .then(data => {
          setAccommodations(data)
        })
        .catch(error => {
          console.error('Error fetching accommodations:', error);
        });
    }, []
  );

  const displayAccommodations = accommodations[0] && accommodations.map((accommodation, idx) => {
    return <TableRow className={idx % 2 === 0 ? "bg-accent" : ""}>
      <TableCell>
        <div className="font-medium">{accommodation.room_type}</div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        {displayAccommodationSleep(accommodation.sleeps)}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        {accommodation.room_count}
      </TableCell>
      <TableCell className="text-right">${accommodation.price}</TableCell>
    </TableRow>
  })

  function displayAccommodationSleep(sleeps){
    let displaySleeps = `${sleeps} guest`
    return sleeps > 1 ? displaySleeps + "s" : displaySleeps
  }

  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10 min-h-[65vh] mb-4">
      <div className="w-[100%] text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
              Optimize
            </span>
            <span> hotel selection </span>
          </h1>
          <span> for </span>
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              Indie
            </span>
            <span> travellers </span>
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Effortlessly plan your trip with accommodations perfectly tailored to your needs.
        </p>
      </div>

      <div className="w-[100%] flex flex-col gap-4">
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <CardTitle>Accommodation Overview</CardTitle>
            <CardDescription>
              The current available number of rooms and types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Room Type</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Sleeps
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Number of Rooms
                  </TableHead>
                  <TableHead className="hidden md:table-cell text-right">
                    Price
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayAccommodations}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <OptimalOptionForm/>
      </div>
    </section>
  );
};
