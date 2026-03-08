import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { planets, zodiacSigns, houses, aspects } from '@/data/astrology';
import { generateCombinationReport, generateAspectReport } from '@/utils/reportGenerator';
import { saveReport } from '@/utils/history';

type Mode = 'combo' | 'aspect';

export default function ReviewMode() {
  const location = useLocation();
  const navigate = useNavigate();
  const question = (location.state as any)?.question || '';

  const [mode, setMode] = useState<Mode>('combo');
  const [planetId, setPlanetId] = useState('');
  const [signId, setSignId] = useState('');
  const [houseId, setHouseId] = useState('');
  const [planet1Id, setPlanet1Id] = useState('');
  const [planet2Id, setPlanet2Id] = useState('');
  const [aspectId, setAspectId] = useState('');

  const canSubmitCombo = planetId && signId && houseId;
  const canSubmitAspect = planet1Id && planet2Id && planet1Id !== planet2Id && aspectId;

  const submit = () => {
    let report;
    if (mode === 'combo') {
      const p = planets.find(x => x.id === planetId)!;
      const s = zodiacSigns.find(x => x.id === signId)!;
      const h = houses.find(x => x.id === houseId)!;
      report = generateCombinationReport(p, s, h, question || undefined);
    } else {
      const p1 = planets.find(x => x.id === planet1Id)!;
      const p2 = planets.find(x => x.id === planet2Id)!;
      const a = aspects.find(x => x.id === aspectId)!;
      report = generateAspectReport(p1, p2, a, question || undefined);
    }
    saveReport(report);
    navigate('/report', { state: { report } });
  };

  const SelectGrid = ({
    items,
    value,
    onChange,
    label,
  }: {
    items: { id: string; name: string; symbol?: string }[];
    value: string;
    onChange: (v: string) => void;
    label: string;
  }) => (
    <div className="mb-6">
      <h3 className="font-display title-cosmic text-sm mb-3">{label}</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
        {items.map(item => (
          <button
            key={item.id}
            className={`border-2 p-2 text-xs text-center transition-all duration-150
              ${value === item.id
                ? 'border-primary bg-primary/20 text-primary'
                : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
              }`}
            onClick={() => onChange(item.id)}
          >
            {item.symbol && <span className="block text-lg mb-1">{item.symbol}</span>}
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background starfield">
      <div className="fixed inset-0 border-4 border-secondary/10 pointer-events-none z-40" />
      <div className="container max-w-3xl mx-auto px-4 py-8 md:py-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <button className="btn-cosmic-outline text-xs mb-8" onClick={() => navigate('/')}>
            ← 返回首頁
          </button>

          <h1 className="text-2xl md:text-4xl font-display text-secondary text-center mb-2" style={{ textShadow: '0 0 20px hsl(272 70% 55% / 0.4)' }}>
            🔭 星盤復盤模式
          </h1>
          <p className="text-center text-muted-foreground text-sm mb-8">
            手動選擇組合，深入練習占星解盤
          </p>

          {question && (
            <div className="card-cosmic-violet mb-8 text-center">
              <p className="text-xs text-muted-foreground mb-1">你的問題</p>
              <p className="text-secondary text-sm">「{question}」</p>
            </div>
          )}

          {/* Mode toggle */}
          <div className="flex gap-2 mb-8 justify-center">
            <button
              className={`px-4 py-2 text-xs font-display border-2 transition-all ${mode === 'combo' ? 'border-primary bg-primary/20 text-primary' : 'border-border text-muted-foreground hover:border-primary/40'}`}
              onClick={() => setMode('combo')}
            >
              行星 + 星座 + 宮位
            </button>
            <button
              className={`px-4 py-2 text-xs font-display border-2 transition-all ${mode === 'aspect' ? 'border-secondary bg-secondary/20 text-secondary' : 'border-border text-muted-foreground hover:border-secondary/40'}`}
              onClick={() => setMode('aspect')}
            >
              行星 + 行星 + 相位
            </button>
          </div>

          {mode === 'combo' ? (
            <div className="card-cosmic">
              <SelectGrid items={planets} value={planetId} onChange={setPlanetId} label="✦ 選擇行星" />
              <SelectGrid items={zodiacSigns} value={signId} onChange={setSignId} label="✦ 選擇星座" />
              <SelectGrid items={houses} value={houseId} onChange={setHouseId} label="✦ 選擇宮位" />
              <button
                className="btn-cosmic w-full text-sm mt-4"
                disabled={!canSubmitCombo}
                onClick={submit}
              >
                ✦ 解析星盤 ✦
              </button>
            </div>
          ) : (
            <div className="card-cosmic-violet">
              <SelectGrid items={planets} value={planet1Id} onChange={setPlanet1Id} label="✦ 選擇第一顆行星" />
              <SelectGrid
                items={planets.filter(p => p.id !== planet1Id)}
                value={planet2Id}
                onChange={setPlanet2Id}
                label="✦ 選擇第二顆行星"
              />
              <SelectGrid items={aspects} value={aspectId} onChange={setAspectId} label="✦ 選擇相位" />
              <button
                className="btn-cosmic-secondary w-full text-sm mt-4"
                disabled={!canSubmitAspect}
                onClick={submit}
              >
                ✦ 解析相位 ✦
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
