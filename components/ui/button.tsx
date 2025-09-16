import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { ActivityIndicator, Pressable } from 'react-native';
import { cn } from '~/lib/utils';
import { Text, TextClassContext } from '~/components/ui/text';

const buttonVariants = cva(
  'group flex items-center justify-center rounded-md web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-[#1F77FF]/80  web:hover:opacity-90  active:opacity-90 rounded-full',
        destructive: 'bg-destructive web:hover:opacity-90 active:opacity-90',
        outline:
          'border border-gray-500 bg-background rounded-full web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent',
        secondary: 'bg-gray-100 rounded-full web:hover:opacity-80 active:opacity-80',
        ghost: 'web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent',
        link: 'web:underline-offset-4 web:hover:underline web:focus:underline',
      },
      size: {
        default: 'h-12 px-4 py-2 native:h-14 native:px-5 native:py-3',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8 native:h-14',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva(
  'web:whitespace-nowrap text-xs native:text-sm font-medium text-foreground web:transition-colors',
  {
    variants: {
      variant: {
        default: 'text-primary-foreground',
        destructive: 'text-destructive-foreground',
        outline: 'group-active:text-accent-foreground',
        secondary: 'text-secondary-foreground group-active:text-secondary-foreground',
        ghost: 'group-active:text-accent-foreground',
        link: 'text-primary group-active:underline',
      },
      size: {
        default: 'native:text-base',
        sm: 'native:text-lg',
        lg: 'native:text-2xl',
        icon: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonProps = React.ComponentProps<typeof Pressable> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
    label?: string;
    labelClassName?: string;
  };

function Button({
  ref,
  className,
  variant = 'default',
  size,
  loading,
  children,
  label,
  labelClassName,
  ...props
}: ButtonProps) {
  return (
    <TextClassContext.Provider
      value={buttonTextVariants({ variant, size, className: 'web:pointer-events-none' })}>
      <Pressable
        className={cn(
          ' ',
          props.disabled && 'opacity-50 web:pointer-events-none',
          buttonVariants({ variant, size, className })
        )}
        ref={ref}
        role="button"
        {...props}>
        {loading && <ActivityIndicator color={variant === 'default' ? 'white' : 'black'} />}
        {!loading && children && <>{children}</>}
        {!loading && !children && label && (
          <Text className={cn('native:text-base text-white', labelClassName)}>{label}</Text>
        )}
      </Pressable>
    </TextClassContext.Provider>
  );
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
