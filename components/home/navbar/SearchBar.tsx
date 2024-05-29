import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/common-ui/shadcn-ui/commandbox/command";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// SearchBar Component
const SearchBar = () => {
  const [input, setInput] = useState<string>('');
  const commandRef = useRef<HTMLDivElement>(null);
  
  //TODO: #28 Add SearchBar functionality

  return (
    <Command
      ref={commandRef}
      className="relative z-50 max-w-lg overflow-visible rounded-lg border"
    >
      <CommandInput
        
        className="border-none outline-none ring-0 focus:border-none focus:outline-none"
        placeholder="Search for groups or users"
      />
     
        <CommandList className="absolute inset-x-0 top-full rounded-b-md bg-white shadow">
        
          
        </CommandList>
      
    </Command>
  );
};

export default SearchBar;
