'use client'

import Link from "next/link"



interface ButtonProps {
    children: React.ReactNode,
    style?: string,
    href?: string,
    target?: string,
}

export const Button = ({children, style, href, target}: ButtonProps) => {
    const styles: Record<string, string> = {
        'primary': 'bg-primary text-primary-foreground hover:bg-primary-glow hover:text-primary-foreground text-md hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg hover:shadow-primary/70  animate-pulse',
        'secondary': ' rounded-xl bg-background text-primary hover:bg-primary-glow/20 hover:text-primary-foreground hover:outline-primary/40 hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg hover:shadow-primary/40 ',
        'primary-card': 'bg-primary text-primary-foreground hover:bg-primary-glow hover:text-primary-foreground hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg hover:shadow-primary/70 w-full ',
        'secondary-card': ' rounded-xl bg-background text-primary hover:bg-primary-glow/20 hover:text-primary-foreground hover:outline-primary/40 hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg hover:shadow-primary/40 w-full ',
    }

    const handlerOnClick = (e: React.MouseEvent) => {
        e.stopPropagation()
      };

  return (
    <Link onClick={handlerOnClick} href={href || '#'} target={ target || ''} className={`px-4 sm:px-6 md:px-8 py-2 outline-1 rounded-xl gap-4 text-sm sm:text-md flex items-center  justify-center  ${styles[style || 'primary']}`}>
                {children}
              </Link>
  )
}
