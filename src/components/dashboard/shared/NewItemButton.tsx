import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export const NewItemButton = ({ placeholder, href }: { placeholder: string, href: string }) => {
  return (
    <Link to={href}>
      <Button variant="outline">
        <Plus />
        {placeholder}
      </Button>
    </Link>
  );
};
