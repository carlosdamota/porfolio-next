'use client'

import { AiOutlineMail } from "react-icons/ai"

interface ButtonProps {
    children: React.ReactNode,
    style?: string,
}

export const Button = ({children, style }: ButtonProps) => {
    const styles: Record<string, string> = {
        'primary': 'bg-primary text-primary-foreground hover:bg-primary-glow hover:text-primary-foreground text-md hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg hover:shadow-primary/70  animate-pulse',
        'secondary': ' rounded-xl bg-background text-primary hover:bg-primary-glow/20 hover:text-primary-foreground hover:outline-primary/40 hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg hover:shadow-primary/40 ',
    }

  return (
    <button className={`px-6 py-2 outline-1 rounded-xl gap-4 text-md flex items-center ${styles[style || 'primary']}`}>
                {children}
              </button>
  )
}
