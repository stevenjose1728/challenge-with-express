import { useRouter } from 'next/router';
import { Link } from './Link';
type Props = {
    children: JSX.Element,
    href: string,
    exact?: boolean,
    className: string
}

function NavLink({ children, href, exact, ...props }: Props) {
    const { pathname } = useRouter();
    const isActive = exact ? pathname === href : pathname.startsWith(href);
    
    if (isActive) {
        props.className += ' active';
    }
    
    return <Link href={href} {...props}>{children}</Link>;
}

export { NavLink };