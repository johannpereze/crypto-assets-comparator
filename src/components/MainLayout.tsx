import { FC, PropsWithChildren } from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { ModeToggle } from "./ModeToggle";
import { Separator } from "./ui/separator";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header className="fixed  left-0 right-0 top-0 z-10 flex justify-center bg-background px-4">
        <div className="flex h-20 w-full max-w-2xl items-center justify-between ">
          <div className={`flex items-center gap-2`}>
            <Logo className="h-12 w-12" />
            <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl">
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
    </>
  );
};

export default MainLayout;
