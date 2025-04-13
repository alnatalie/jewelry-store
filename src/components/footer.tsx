import Link from "next/link"

export function Footer(){
    const pages = [
        {href: '/help', title:'Помощь'},
        {href: '/contacts', title:'Контакты'},
        
    
    ]
    return <footer>
        <div>
        <h2>PRICOSNIS</h2>
        © 2025  «PRICOSNIS».
        все права защищены.
        </div>
        <div>
            <ul>
                {pages.map(({href,title})=>
                <li key={href}>
                    <Link href={href}>
                    {title}
                 </Link>
             </li>
             )}
            </ul>
        </div>
    </footer>
}