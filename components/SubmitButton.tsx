import Image from "next/image";
import { Button } from "./ui/button";

interface SubmitButtonProps {
  isLoading: boolean;
  children?: React.ReactNode;
  className?: string;
}

const SubmitButton = ({ isLoading, children, className }: SubmitButtonProps) => {
  return (
    <Button type="submit" disabled={isLoading} className={`${className ?? "shad-primary-btn w-full"}`}>
      {isLoading ? (
        <div className="flex gap-4 items-center">
          <Image src={"/assets/icons/loader.svg"} width={24} height={24} className="mr-2" alt="submit" />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
