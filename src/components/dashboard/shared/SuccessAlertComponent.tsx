import { CheckCircle2Icon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertDemo({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      <Alert>
        <CheckCircle2Icon />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
         {description}
        </AlertDescription>
      </Alert>
     
    </div>
  )
}
