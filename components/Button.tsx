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
  'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold no-underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] disabled:opacity-50';

export function PrimaryButton(props: ButtonProps) {
  const { children, className = '' } = props;
  const styles = `${base} bg-[var(--color-brand-orange)] text-white hover:opacity-90 ${className}`;
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
  const styles = `${base} border border-[var(--color-border)] bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-surface-elevated)] ${className}`;
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
