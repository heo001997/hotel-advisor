import { createContext } from "react";
import { Accommodation } from "@/components/Hero";

export interface AccommodationContextType {
  accommodations: Accommodation[];
}

const AccommodationContext = createContext<AccommodationContextType>({ accommodations: [] });

export default AccommodationContext;