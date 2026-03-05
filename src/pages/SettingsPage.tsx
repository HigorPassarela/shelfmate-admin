import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Settings, Moon, Sun, Eye, Type, Zap } from 'lucide-react';

export default function SettingsPage() {
  const { mode, setMode, fontSize, setFontSize, reducedMotion, setReducedMotion } = useTheme();

  return (
    <div className="container max-w-2xl py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-display text-foreground">Configurações</h1>
        <p className="text-muted-foreground mt-1">Personalize sua experiência</p>
      </div>

      <div className="space-y-6">
        {/* Theme Mode */}
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <Moon className="h-5 w-5 text-primary" /> Aparência
            </CardTitle>
            <CardDescription>Escolha o tema visual da página</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setMode('dark')}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  mode === 'dark'
                    ? 'border-primary bg-primary/10'
                    : 'border-border/50 hover:border-border bg-secondary/30'
                }`}
              >
                <Moon className="h-6 w-6" />
                <span className="text-sm font-medium">Escuro</span>
              </button>
              <button
                onClick={() => setMode('light')}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  mode === 'light'
                    ? 'border-primary bg-primary/10'
                    : 'border-border/50 hover:border-border bg-secondary/30'
                }`}
              >
                <Sun className="h-6 w-6" />
                <span className="text-sm font-medium">Claro</span>
              </button>
              <button
                onClick={() => setMode('high-contrast')}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  mode === 'high-contrast'
                    ? 'border-primary bg-primary/10'
                    : 'border-border/50 hover:border-border bg-secondary/30'
                }`}
              >
                <Eye className="h-6 w-6" />
                <span className="text-sm font-medium">Alto Contraste</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Font Size */}
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <Type className="h-5 w-5 text-primary" /> Tamanho da Fonte
            </CardTitle>
            <CardDescription>Ajuste o tamanho do texto para melhor leitura</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setFontSize('normal')}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  fontSize === 'normal'
                    ? 'border-primary bg-primary/10'
                    : 'border-border/50 hover:border-border bg-secondary/30'
                }`}
              >
                <span className="text-sm">Aa</span>
                <span className="text-sm font-medium">Normal</span>
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  fontSize === 'large'
                    ? 'border-primary bg-primary/10'
                    : 'border-border/50 hover:border-border bg-secondary/30'
                }`}
              >
                <span className="text-base">Aa</span>
                <span className="text-sm font-medium">Grande</span>
              </button>
              <button
                onClick={() => setFontSize('extra-large')}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  fontSize === 'extra-large'
                    ? 'border-primary bg-primary/10'
                    : 'border-border/50 hover:border-border bg-secondary/30'
                }`}
              >
                <span className="text-lg">Aa</span>
                <span className="text-sm font-medium">Extra Grande</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Accessibility */}
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" /> Acessibilidade
            </CardTitle>
            <CardDescription>Opções adicionais de acessibilidade</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground font-medium">Reduzir animações</Label>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Desativa transições e efeitos visuais
                </p>
              </div>
              <Switch
                checked={reducedMotion}
                onCheckedChange={setReducedMotion}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
