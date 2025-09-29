import {ChevronLeft } from "lucide-react"
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"

export const BackButton = ({ url } : 
    {url: string}
) => {
  return (
    <>
      <Link to={url}>
        <Button variant="destructive" size="icon" className="size-8">
          <ChevronLeft />
        </Button>
      </Link>
    </>
  );
};
