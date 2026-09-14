'use client'

import React, {
  forwardRef,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

const variantStyles: Record<Variant, React.CSSProperties> = {
  primary: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: '1px solid transparent',
  },
  secondary: {
    backgroundColor: '#e5e7eb',
    color: '#111827',
    border: '1px solid #d1d5db',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: '#111827',
    border: '1px solid transparent',
  },
};

const sizeStyles: Record<Size, React.CSSProperties> = {
  sm: { padding: '6px 10px', fontSize: 12 },
  md: { padding: '8px 14px', fontSize: 14 },
  lg: { padding: '12px 18px', fontSize: 16 },
};

const baseStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 6,
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'background-color 150ms ease, transform 80ms ease',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      className,
      style,
      disabled,
      ...rest
    },
    ref
  ) => {
    const combinedStyle: React.CSSProperties = {
      ...baseStyle,
      ...variantStyles[variant],
      ...sizeStyles[size],
      opacity: disabled ? 0.6 : 1,
      pointerEvents: disabled ? 'none' : undefined,
      ...style,
    };

    return (
      <button
        ref={ref}
        className={className}
        style={combinedStyle}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
