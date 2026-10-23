import type { ComponentProps } from 'react';
export default function ExampleLink(props: ComponentProps<'a'>) {
  return (
    <a
      {...props}
      href={props.href ?? '#/components'}
      onClick={(event) => {
        if (props.href?.startsWith('#') || props.href?.startsWith('/'))
          event.preventDefault();
        props.onClick?.(event);
      }}
    />
  );
}
