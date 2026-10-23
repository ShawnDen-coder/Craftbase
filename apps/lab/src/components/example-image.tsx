import type { ComponentProps } from 'react';
export default function ExampleImage({
  fill,
  priority,
  unoptimized,
  alt,
  ...props
}: ComponentProps<'img'> & {
  fill?: boolean;
  priority?: boolean;
  unoptimized?: boolean;
}) {
  return (
    <img
      alt={alt ?? ''}
      {...props}
      loading={priority ? 'eager' : 'lazy'}
      style={{
        ...(fill
          ? ({
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            } as const)
          : {}),
        ...props.style,
      }}
    />
  );
}
