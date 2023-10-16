import { Button } from "@/components/ui/button";
import { SetReloadFn } from "./types";

interface PlayHeaderProps {
  setReload: SetReloadFn;
}

export function PlayHeader({ setReload }: PlayHeaderProps) {
  return (
    <div className="bg-nav-background p-4 space-y-6">
      <div className="flex justify-center ml-auto">
        <h1 className="text-2xl text-white">Let&apos;s play!</h1>
      </div>

      <Button
        onClick={() => setReload(true)}
        variant="destructive"
        className="flex justify-center mx-auto"
      >
        Restart
      </Button>
    </div>
  );
}
