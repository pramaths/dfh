
import { Button } from "@/components/ui/button"

function Usecase() {
  return (
    (<div className="max-w-md mx-auto my-12">
      <h1 className="text-3xl font-semibold text-center mb-8">What are you looking to achieve with Wanderer?</h1>
      <div className="space-y-4">
        <Button className="w-full">Change careers</Button>
        <Button className="w-full">Advance in my current career</Button>
        <Button className="w-full">Explore future career options</Button>
        <Button className="w-full">Just checking things out</Button>
      </div>
    </div>)
  );
}
export default Usecase;