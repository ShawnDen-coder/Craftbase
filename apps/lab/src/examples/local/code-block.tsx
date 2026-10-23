import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from '../../../../../design-system/react/ui/code-block';

const code =
  'import { Button } from "@/components/ui/button"\n\n<Button variant="outline">保存修改</Button>';
export default function CodeBlockExample() {
  return (
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>example.tsx</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={code} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent>
        {code.split('\n').map((line) => (
          <CodeBlockLine key={line}>{line || '\n'}</CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  );
}
