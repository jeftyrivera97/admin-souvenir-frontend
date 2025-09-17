import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"
import { useState } from "react"

interface SearchItemInputProps {
  placeholder: string;
  onSearch: (searchTerm: string) => void;
  loading?: boolean;
}

export const SearchItemInput = ({ placeholder, onSearch, loading = false }: SearchItemInputProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="search" className="flex items-center">
        Buscador cd <Search className="ml-2 h-4 w-4" />
      </Label>
      <div className="flex gap-2">
        <Input 
          type="text" 
          id="search" 
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <Button
          type="submit"
          disabled={loading || !searchTerm.trim()}
          variant="default"
         
        >
          {loading ? "..." : "Buscar"}
        </Button>
      </div>
    </form>
  )
}
