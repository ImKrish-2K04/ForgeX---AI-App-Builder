import { Button } from "@/components/ui/button";
import { Show, SignUpButton, UserButton } from "@clerk/nextjs";
import { Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="flex w-full max-w-5xl items-center justify-between rounded-2xl border border-white/20 bg-white/7 px-4 py-3 shadow-sm backdrop-blur-md">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            alt="ForgeX logo"
            height={100}
            width={100}
            className="h-9 w-auto rounded-md"
          />
        </Link>
        <nav className="flex items-center gap-5">
          <Show when={"signed-out"}>
            <SignUpButton mode="modal">
              <Button variant={"outline"} className="cursor-pointer">
                Sign Up
              </Button>
            </SignUpButton>
          </Show>

          <Show when={"signed-in"}>
            <Link href={"/projects"} className="nav-link">
              Projects
            </Link>
            <span className="inline-flex items-center gap-1.5 border border-white/10 bg-white/5 rounded-full h-8 px-3 text-white/70 text-xs">
              <Zap className="h-3 w-3 fill-white/70" />
              3/40 credits
            </span>
            <UserButton />
          </Show>
        </nav>
      </div>
    </header>
  );
};

export default Header;
