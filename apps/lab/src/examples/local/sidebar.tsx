import { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '../../../../../design-system/react/ui/sidebar';
export default function SidebarExample() {
  const [active, setActive] = useState('设计基础');
  return (
    <SidebarProvider className="min-h-80 rounded-lg border overflow-hidden">
      <Sidebar collapsible="none" className="w-48">
        <SidebarHeader>Craftbase</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>工作区</SidebarGroupLabel>
            <SidebarMenu>
              {['设计基础', '组件样式', '材质研究'].map((name) => (
                <SidebarMenuItem key={name}>
                  <SidebarMenuButton
                    isActive={active === name}
                    onClick={() => setActive(name)}
                  >
                    {name}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="p-6 min-w-0">
        <h2>{active}</h2>
        <p className="mt-4 text-muted-foreground">
          切换条目，观察导航层级与选中状态。
        </p>
      </div>
    </SidebarProvider>
  );
}
