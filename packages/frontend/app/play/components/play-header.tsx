import { Button } from "@/components/ui/button";

export function PlayHeader() {
  return (
    <div className="bg-nav-background p-4 space-y-6">
      <div className="flex justify-center ml-auto">
        <h1 className="text-2xl text-white">Let&apos;s play!</h1>
      </div>

      <Button variant="destructive" className="flex justify-center mx-auto">
        Restart
      </Button>
    </div>
  );
}
