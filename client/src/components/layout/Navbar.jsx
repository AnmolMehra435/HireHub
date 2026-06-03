import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../ui/sheet";

function Navbar() {
  return (
    <nav className="w-full h-12 bg-violet-300">
      <div className="flex justify-between items-center h-full px-4">
        
        {/* Logo */}
        <div className="flex">
          <h1 className="text-xl font-bold text-black">Hire</h1>
          <h1 className="text-xl text-gray-800">Hub</h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <a className="mr-6" href="#">
            Home
          </a>
          <a className="mr-6" href="#">
            Jobs
          </a>
          <a className="mr-6" href="#">
            Dashboard
          </a>

          <Button className="mr-3">Login</Button>
          <Button>Register</Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                ☰
              </Button>
            </SheetTrigger>

            <SheetContent side="top">
              <div className="flex flex-col gap-4 mt-8">
                <a href="#">Home</a>
                <a href="#">Jobs</a>
                <a href="#">Dashboard</a>

                <Button>Login</Button>
                <Button>Register</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;