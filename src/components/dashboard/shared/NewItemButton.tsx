import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"


export const NewItemButton = ({placeholder} : {placeholder: string}) => {
  return (
     <Button variant="outline">
       <Plus />
       {placeholder}
     </Button>
  )
}
