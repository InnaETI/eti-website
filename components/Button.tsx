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
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold no-underline transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50';

export function PrimaryButton(props: ButtonProps) {
  const { children, className = '' } = props;
  const styles = `${base} bg-[linear-gradient(135deg,var(--color-brand-orange),#f0a165)] text-white shadow-[0_14px_34px_rgba(226,121,66,0.2)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(226,121,66,0.24)] ${className}`;
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
  const styles = `${base} border border-[rgba(17,39,77,0.16)] bg-white text-[var(--color-brand-blue-deep)] shadow-[0_12px_28px_rgba(17,39,77,0.06)] hover:-translate-y-0.5 hover:border-[var(--color-brand-blue)] hover:bg-[rgba(248,251,255,1)] ${className}`;
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
