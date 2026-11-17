import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const variants = {
  primary: 'btn-primary',
  light: 'btn-outline-light',
  dark: 'btn-outline-dark',
  ghost: 'btn bg-transparent px-0 py-0 font-bold tracking-[0.16em]',
};

const isInternal = (href = '') => href.startsWith('/') && !href.startsWith('//');

/**
 * Shared CTA. Internal paths use the router, anchors and external URLs use a
 * plain link so in-page navigation stays accessible without handlers.
 */
export default function Button({
  href = '/contact-us',
  children,
  variant = 'primary',
  external = false,
  arrow = true,
  className = '',
  ...rest
}) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  const classes = `${variants[variant] || variants.primary} ${className}`;

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow && <Icon className="relative z-10 h-4 w-4" strokeWidth={2} aria-hidden="true" />}
    </>
  );

  if (!external && isInternal(href)) {
    return (
      <Link to={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...rest}
    >
      {content}
    </a>
  );
}
