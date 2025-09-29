import { AlertCircleIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function ErrorAlertComponent({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          <p>{description}</p>
          <ul className="list-inside list-disc text-sm">
            <li>Revisa los detalles del error</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  )
}
