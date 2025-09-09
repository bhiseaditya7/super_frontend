import { RideScreen } from "./components/RideScreen";

export default function RidePage() {
  // For now, we can pass a dummy onNavigate function
  return <RideScreen onNavigate={(screen) => console.log("Navigate to:", screen)} />;
}