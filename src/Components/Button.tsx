'use client'

import Link from "next/link"



interface ButtonProps {
    children: React.ReactNode,
    style?: string,
    href?: string,
    target?: string,
    download?: boolean 
}


export const Button = ({children, style, href, target, download }: ButtonProps) => {
    const styles: Record<string, string> = {
        'primary': 'bg-primary/50 text-primary-foreground hover:bg-primary-glow hover:text-primary-foreground text-md hover:scale-104 transition-transform duration-200 shadow-md hover:shadow-lg hover:shadow-primary/70  animate-pulse',
        'secondary': ' rounded-xl bg-background text-primary hover:bg-primary-glow/20 hover:text-primary-foreground hover:outline-primary/40 hover:scale-104 transition-transform duration-200 shadow-md hover:shadow-lg hover:shadow-primary/40 ',
        'primary-card': 'bg-primary/50 text-primary-foreground hover:bg-primary-glow hover:text-primary-foreground hover:scale-102 transition-transform duration-200 shadow-md hover:shadow-lg hover:shadow-primary/70 w-full  max-w-sm',
        'secondary-card': ' rounded-xl bg-background text-primary hover:bg-primary-glow/20 hover:text-primary-foreground hover:outline-primary/40 hover:scale-105 transition-transform duration-200 shadow-md hover:shadow-lg hover:shadow-primary/40 w-full max-w-sm',
    }

    const handlerOnClick = (e: React.MouseEvent) => {
        e.stopPropagation()
      };

  
      return (
    <Link  onClick={handlerOnClick} href={href || '#'} {...(download ? { download: true } : {})} target={ target || ''} className={`px-4 sm:px-6 md:px-8 py-2  rounded-xl gap-4 text-sm sm:text-md flex items-center  justify-center  ${styles[style || 'primary']} glass `}>
                {children}
              </Link>
  )
}
