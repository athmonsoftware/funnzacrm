import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth-client"

export function Profile() {
  const {data } = authClient.useSession();
  return (
    <DropdownMenu>  
      <DropdownMenuTrigger>
        <Button variant="outline" className="flex items-center">
            <div className="w-8 h-8">
            {
                data?.user?.image ? (
                    <img src={data.user.image} alt={data.user.name} />
                ) : (
                    <div className="w-2 h-2 bg-gray-200 rounded-full">
                        {data?.user?.name?.charAt(0).toUpperCase()}
                    </div>
                )
            }
            </div>
            
            <span className="ml-2">{data?.user?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem
          onClick={async () => {
            await authClient.signOut();
            window.location.href = "/login";
          }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
