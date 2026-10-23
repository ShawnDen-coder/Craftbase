import { ArrowLeftIcon, ArrowRightIcon, CircleDashedIcon, SaveIcon } from "lucide-react"
import {
  Example,
  ExampleWrapper,
} from "@/apps/lab/src/components/official-example"
import { Button } from "@/design-system/react/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/design-system/react/ui/input-group"
import { Kbd, KbdGroup } from "@/design-system/react/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/design-system/react/ui/tooltip"
export default function KbdExample() {
  return (
    <ExampleWrapper>
      <KbdBasic />
      <KbdModifierKeys />
      <KbdGroupExample />
      <KbdArrowKeys />
      <KbdWithIcons />
      <KbdWithIconsAndText />
      <KbdInInputGroup />
      <KbdInTooltip />
      <KbdWithSamp />
    </ExampleWrapper>
  )
}

function KbdBasic() {
  return (
    <Example title="Basic">
      <div className="flex items-center gap-2">
        <Kbd>Ctrl</Kbd>
        <Kbd>⌘K</Kbd>
        <Kbd>Ctrl + B</Kbd>
      </div>
    </Example>
  )
}

function KbdModifierKeys() {
  return (
    <Example title="Modifier Keys">
      <div className="flex items-center gap-2">
        <Kbd>⌘</Kbd>
        <Kbd>C</Kbd>
      </div>
    </Example>
  )
}

function KbdGroupExample() {
  return (
    <Example title="KbdGroup">
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>P</Kbd>
      </KbdGroup>
    </Example>
  )
}

function KbdArrowKeys() {
  return (
    <Example title="Arrow Keys">
      <div className="flex items-center gap-2">
        <Kbd>↑</Kbd>
        <Kbd>↓</Kbd>
        <Kbd>←</Kbd>
        <Kbd>→</Kbd>
      </div>
    </Example>
  )
}

function KbdWithIcons() {
  return (
    <Example title="With Icons">
      <KbdGroup>
        <Kbd>
          <CircleDashedIcon
          />
        </Kbd>
        <Kbd>
          <ArrowLeftIcon
          />
        </Kbd>
        <Kbd>
          <ArrowRightIcon
          />
        </Kbd>
      </KbdGroup>
    </Example>
  )
}

function KbdWithIconsAndText() {
  return (
    <Example title="With Icons and Text">
      <KbdGroup>
        <Kbd>
          <ArrowLeftIcon
          />
          Left
        </Kbd>
        <Kbd>
          <CircleDashedIcon
          />
          Voice Enabled
        </Kbd>
      </KbdGroup>
    </Example>
  )
}

function KbdInInputGroup() {
  return (
    <Example title="InputGroup">
      <InputGroup>
        <InputGroupInput />
        <InputGroupAddon>
          <Kbd>Space</Kbd>
        </InputGroupAddon>
      </InputGroup>
    </Example>
  )
}

function KbdInTooltip() {
  return (
    <Example title="Tooltip">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon-sm" variant="outline">
            <SaveIcon
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="pr-1.5">
          <div className="flex items-center gap-2">
            Save Changes <Kbd>S</Kbd>
          </div>
        </TooltipContent>
      </Tooltip>
    </Example>
  )
}

function KbdWithSamp() {
  return (
    <Example title="With samp">
      <Kbd>
        <samp>File</samp>
      </Kbd>
    </Example>
  )
}
