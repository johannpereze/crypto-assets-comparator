import { FC, PropsWithChildren } from "react";
import { ReactComponent as GithubLogo } from "../assets/GithubLogo.svg";
import { ReactComponent as Logo } from "../assets/Logo.svg";
import { ModeToggle } from "./ModeToggle";
import { Separator } from "./ui/separator";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <header className="fixed left-0 right-0 top-0 z-10 flex justify-center bg-background px-4">
        <div className="flex h-20 w-full max-w-2xl items-center justify-between ">
          <div className={`flex items-center`}>
            <Logo className="h-14 w-14" />
            <h1 className="scroll-m-20 font-semibold tracking-tight text-2xl lg:text-5xl">
              CA Comparator
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
          </div>
        </div>
      </header>
      <div className="h-20 w-full" />
      <Separator />
      <main className="flex justify-center">
        <div className="w-full md:max-w-2xl">{children}</div>
      </main>
      <footer className="flex justify-center py-4 items-center">
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} CA Comparator
        </p>
        <a
          href="https://github.com/johannpereze/crypto-assets-comparator"
          target="_blank"
          rel="noreferrer"
        >
          <GithubLogo className="h-4 w-4 ml-2" />
        </a>
      </footer>
    </div>
  );
};

export default MainLayout;
