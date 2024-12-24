import { useSelector } from 'react-redux'

import { AuthState } from '@/redux/slices/auth.slice'
import { BreadcrumbState } from '@/redux/slices/breadcrumb.slice'
import { RootState } from '@/redux/store'
import { cn } from '@/utils/global.utils'

import Breadcrumbs from '@/components/features/breadcrumbs'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

function Header() {
  const { user }: AuthState = useSelector((state: RootState) => state.authState)

  const { breadcrumbs }: BreadcrumbState = useSelector((state: RootState) => state.breadcrumbState)
  return (
    <header
      className={cn(
        'flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-16'
      )}
    >
      <div className="flex w-full items-center justify-between gap-2 px-4">
        <div className="flex flex-1 items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          {breadcrumbs.length > 0 && <Separator orientation="vertical" className="mr-2 h-4" />}
          <Breadcrumbs items={breadcrumbs} className="h-full items-center" />
        </div>
        {/* <div className="flex items-center space-x-4">
            <Input type="search" placeholder="Search..." className="w-64" />
          </div> */}
        <span className="text-sm capitalize text-muted-foreground">{`Welcome, ${user?.firstName} ${user?.lastName}`}</span>
      </div>
    </header>
  )
}

export default Header
