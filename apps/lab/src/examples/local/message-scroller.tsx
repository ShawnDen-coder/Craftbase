import { useState } from 'react';
import { Button } from '../../../../../design-system/react/ui/button';
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from '../../../../../design-system/react/ui/message-scroller';
export default function MessageScrollerExample() {
  const [messages, setMessages] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: `message-${i}`,
      number: i + 1,
    })),
  );
  return (
    <div className="grid gap-4">
      <MessageScrollerProvider>
        <MessageScroller className="h-80 rounded-lg border">
          <MessageScrollerViewport aria-label="示例消息">
            <MessageScrollerContent className="p-4 space-y-4">
              {messages.map((message) => (
                <MessageScrollerItem
                  key={message.id}
                  messageId={message.id}
                  className="rounded-lg bg-muted p-4"
                >
                  样式观察记录 {message.number}：检查当前配色下的文字和背景。
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>
      <Button
        variant="outline"
        onClick={() =>
          setMessages((items) => [
            ...items,
            { id: crypto.randomUUID(), number: items.length + 1 },
          ])
        }
      >
        追加示例消息
      </Button>
    </div>
  );
}
