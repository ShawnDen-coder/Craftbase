import {
  Bubble,
  BubbleContent,
} from '../../../../../design-system/react/ui/bubble';
import {
  Message,
  MessageContent,
  MessageFooter,
  MessageGroup,
} from '../../../../../design-system/react/ui/message';
export default function MessageExample() {
  return (
    <MessageGroup>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>这组控件可以切换深色吗？</BubbleContent>
          </Bubble>
          <MessageFooter>示例消息 · 10:24</MessageFooter>
        </MessageContent>
      </Message>
      <Message>
        <MessageContent>
          <Bubble>
            <BubbleContent>
              使用左侧配色设置，观察文字、边界和浮层的变化。
            </BubbleContent>
          </Bubble>
          <MessageFooter>示例回复 · 10:25</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  );
}
