import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function MainCard() {
  return (
    <div className="flex justify-center w-full p-4">
      <div className="min-w-[16rem] max-w-xl w-full">
        <Card>
          <CardHeader>
            <CardTitle>JP Wallet</CardTitle>
            <CardDescription>ETH Balance</CardDescription>
          </CardHeader>
          <CardContent>
            <p>1000 ETH</p>
          </CardContent>
          <CardFooter>footer</CardFooter>
        </Card>
      </div>
    </div>
  );
}
