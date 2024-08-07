import {useContext} from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/shadcnui/components/ui/dialog.tsx';
import {capitalizeFirstLetter} from "@/libs/common.tsx";
import AccommodationContext, { AccommodationContextType } from "@/contexts/AccommodationContext.tsx";
import { OptimalOption } from "@/components/OptimalOptionForm";

interface OptimalOptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  optimalOption: OptimalOption;
}

function OptimalOptionDialog({ open, onOpenChange, optimalOption }: OptimalOptionDialogProps) {
  const { accommodations } = useContext(AccommodationContext) as AccommodationContextType

  const displayOptimalOption = optimalOption.raw && Object.keys(optimalOption.raw).map(function(roomType, idx) {
    const roomCount = optimalOption.raw[roomType]
    if (roomCount <= 0) return null

    console.log("roomCount: ", roomCount)
    const matchAccommodation = accommodations.find(accommodation => accommodation.room_type === roomType)
    console.log("matchAccommodation: ", matchAccommodation)
    if (!matchAccommodation) return null

    return <div key={idx} className="flex gap-5">
      <img
        alt="Room type image"
        className="aspect-video object-cover rounded-md"
        height="600"
        src={`../src/assets/${roomType}.jpg`}
        width="600"
      />
      <div className="bg-gray-50 text-base text-primary border rounded-md p-2">
        <div className="text-lg font-semibold">{capitalizeFirstLetter(roomType)}</div>
        <div>Room Type: {capitalizeFirstLetter(roomType)}</div>
        <div>Sleeps: {matchAccommodation.sleeps}</div>
        <div>Number of Rooms: {roomCount}</div>
        <div>Price per Room: {matchAccommodation.price}</div>
        <div>Total price of Room Type: ${matchAccommodation.price * roomCount}</div>
      </div>
    </div>
  })

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-w-[60vw] max-h-[70vh] overflow-y-auto w-auto">
        <DialogTitle>
          <div className="text-2xl">Accommodation Optimal Option</div>
          <div className="text-lg font-normal">Combo: {optimalOption.formatted}</div>
        </DialogTitle>
        <DialogDescription asChild>
          <div className="flex flex-col gap-5">
            {displayOptimalOption}
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default OptimalOptionDialog;