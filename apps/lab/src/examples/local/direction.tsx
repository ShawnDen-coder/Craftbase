import { DirectionProvider } from '../../../../../design-system/react/ui/direction';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../../../design-system/react/ui/tabs';
export default function DirectionExample() {
  return (
    <div className="grid gap-8">
      {(['ltr', 'rtl'] as const).map((dir) => (
        <DirectionProvider key={dir} dir={dir}>
          <div dir={dir}>
            <p>
              {dir === 'ltr' ? '从左到右 / LTR' : 'من اليمين إلى اليسار / RTL'}
            </p>
            <Tabs defaultValue="first">
              <TabsList>
                <TabsTrigger value="first">One</TabsTrigger>
                <TabsTrigger value="second">Two</TabsTrigger>
              </TabsList>
              <TabsContent value="first">使用方向键切换标签。</TabsContent>
              <TabsContent value="second">
                布局方向和键盘导航保持一致。
              </TabsContent>
            </Tabs>
          </div>
        </DirectionProvider>
      ))}
    </div>
  );
}
