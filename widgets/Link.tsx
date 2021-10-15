import NextLink from 'next/link';

type Props = {
    href: string,
    children: string,
}
function Link({ href, children, ...props }: Props) {
    return (
        <NextLink href={href}>
            <a {...props}>
                {children}
            </a>
        </NextLink>
    );
}

export { Link };