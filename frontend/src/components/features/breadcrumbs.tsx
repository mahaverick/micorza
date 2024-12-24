import React from 'react'
import { Link } from 'react-router-dom'

import { ChevronRight, MoreHorizontal } from 'lucide-react'

import { cn } from '@/utils/global.utils'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export interface BreadcrumbItem {
  href: string
  label: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
  maxItems?: number
  className?: string
}

export default function Breadcrumbs({
  items,
  separator = <ChevronRight className="size-4" />,
  maxItems = 4,
  className,
}: BreadcrumbsProps) {
  const [start, ...end] = items

  const truncatedItems =
    items.length > maxItems ? [start, { href: '', label: '...' }, ...end.slice(-2)] : items

  return (
    <Breadcrumb className={cn('flex-wrap', className)}>
      <BreadcrumbList className="h-full">
        {truncatedItems.map((item, index) => (
          <React.Fragment key={item.href}>
            {index > 0 && (
              <BreadcrumbSeparator className="hidden md:block">{separator}</BreadcrumbSeparator>
            )}
            <BreadcrumbItem
              className={cn(index === truncatedItems.length - 1 ? 'md:block' : 'hidden md:block')}
            >
              {index === truncatedItems.length - 1 ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : item.href ? (
                <BreadcrumbLink asChild>
                  <Link to={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              ) : (
                <MoreHorizontal className="size-4" />
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
