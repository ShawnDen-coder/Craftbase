import type { ComponentProps } from 'react';
import { cn } from '../../../../design-system/react/lib/utils';
export function ExampleWrapper({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="example-wrapper"
      className={cn('official-examples', className)}
      {...props}
    />
  );
}
export function Example({
  title,
  className,
  containerClassName,
  children,
  ...props
}: ComponentProps<'div'> & { title?: string; containerClassName?: string }) {
  return (
    <section className={cn('official-example', containerClassName)} {...props}>
      <h2>{title}</h2>
      <div
        data-slot="example-content"
        className={cn('official-example-content', className)}
      >
        {children}
      </div>
    </section>
  );
}
