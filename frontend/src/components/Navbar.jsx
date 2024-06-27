import { CircleUser, Menu, Package2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { logout } from "@/store/features/auth/authSlice";
import { toast } from "react-toastify";


function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {

        console.log("logout button clicked");
        //logout logic here
        dispatch(logout())
            .unwrap()
            .then((response) => {
                if (response?.success == true) {

                    toast.success(response?.message, { autoClose: 2000 });
                    setTimeout(() => {
                        navigate("/login");
                    }, 2000);
                } else {
                    toast.error(response?.message, { autoClose: 2000 });

                }

            })
            .catch((error) => {
                toast.error(error, { autoClose: 2000 });
            })



      

    }
    return (
        <>
            {/* Desktop Menu */}
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link
                        href="#"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                    >
                        <Package2 className="h-6 w-6" />
                        <span className="sr-only">Acme Inc</span>
                        <p className="text-xl">
                            Shop<span className="text-orange-500">Wave</span>
                        </p>
                        <span className="sr-only">ShopWave</span>
                    </Link>
                    <Link
                        to="/"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Home
                    </Link>
                    <Link
                        to="/shop"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Shop
                    </Link>
                    <Link
                        to="/about"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        About
                    </Link>
                    <Link
                        to="/contact"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Contact
                    </Link>

                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                        >
                            {/* Mobile Menu */}
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href="#"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <Package2 className="h-6 w-6" />
                                <p className="text-xl">
                                    Shop<span className="text-orange-500">Wave</span>
                                </p>

                                <span className="sr-only">ShopWave</span>

                            </Link>
                            <Link
                                to="/"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Home
                            </Link>
                            <Link
                                to="/shop"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Shop
                            </Link>
                            <Link
                                to="/about"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                About
                            </Link>
                            <Link
                                to="/contact"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Contact
                            </Link>

                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <div className="ml-auto  sm:flex-initial">
                        <div className="relative">
                            Cart (0)

                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <button onClick={handleLogout}>Logout</button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

        </>
    )
}

export default Navbar