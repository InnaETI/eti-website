import Link from 'next/link';

type ButtonBase = {
  children: React.ReactNode;
  className?: string;
};

type ButtonAsButton = ButtonBase & {
  as?: 'button';
  href?: never;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
};

type ButtonAsLink = ButtonBase & {
  as: 'link';
  href: string;
  type?: never;
  disabled?: never;
  onClick?: never;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold no-underline transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] disabled:opacity-50';

export function PrimaryButton(props: ButtonProps) {
  const { children, className = '' } = props;
  const styles = `${base} bg-[linear-gradient(135deg,var(--color-brand-orange),#f0a165)] text-white shadow-[0_16px_38px_rgba(226,121,66,0.24)] hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(226,121,66,0.28)] ${className}`;
  if (props.as === 'link' && props.href) {
    return (
      <Link href={props.href} className={styles}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={props.type ?? 'button'}
      disabled={'disabled' in props ? props.disabled : false}
      onClick={'onClick' in props ? props.onClick : undefined}
      className={styles}
    >
      {children}
    </button>
  );
}

export function SecondaryButton(props: ButtonProps) {
  const { children, className = '' } = props;
  const styles = `${base} border border-[var(--color-border-strong)] bg-white/75 text-[var(--color-ink)] shadow-[0_10px_30px_rgba(17,39,77,0.08)] backdrop-blur hover:border-[var(--color-brand-blue)] hover:bg-white ${className}`;
  if (props.as === 'link' && props.href) {
    return (
      <Link href={props.href} className={styles}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={props.type ?? 'button'}
      disabled={'disabled' in props ? props.disabled : false}
      onClick={'onClick' in props ? props.onClick : undefined}
      className={styles}
    >
      {children}
    </button>
  );
}
