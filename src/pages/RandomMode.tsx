import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { randomCombination, randomAspectCombination, type ReportData } from '@/utils/reportGenerator';
import { saveReport } from '@/utils/history';

export default function RandomMode() {
  const location = useLocation();
  const navigate = useNavigate();
  const question = (location.state as any)?.question || '';
  const [report, setReport] = useState<ReportData | null>(null);
  const [generating, setGenerating] = useState(false);

  const generate = (type: 'combo' | 'aspect') => {
    setGenerating(true);
    setTimeout(() => {
      const r = type === 'combo'
        ? randomCombination(question || undefined)
        : randomAspectCombination(question || undefined);
      saveReport(r);
      setReport(r);
      setGenerating(false);
    }, 800);
  };

  if (report) {
    navigate('/report', { state: { report } });
    return null;
  }

  return (
    <div className="min-h-screen bg-background starfield">
      <div className="fixed inset-0 border-4 border-primary/10 pointer-events-none z-40" />
      <div className="container max-w-3xl mx-auto px-4 py-8 md:py-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <button className="btn-cosmic-outline text-xs mb-8" onClick={() => navigate('/')}>
            ← 返回首頁
          </button>

          <h1 className="text-2xl md:text-4xl font-display title-cosmic mb-2 text-center">
            🎲 隨機星盤組合
          </h1>
          <p className="text-center text-muted-foreground text-sm mb-8">
            讓宇宙為你安排一場命運的邂逅
          </p>

          {question && (
            <div className="card-cosmic mb-8 text-center">
              <p className="text-xs text-muted-foreground mb-1">你的問題</p>
              <p className="text-primary text-sm">「{question}」</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* Combo type */}
            <div className="card-cosmic text-center">
              <div className="text-3xl mb-4 zodiac-symbol">☉ × ♌ × 宮</div>
              <h2 className="font-display title-cosmic text-lg mb-2">行星 + 星座 + 宮位</h2>
              <p className="text-muted-foreground text-xs mb-6">
                隨機組合一顆行星、一個星座與一個宮位，生成完整的占星解析。
              </p>
              <button
                className="btn-cosmic w-full text-sm"
                disabled={generating}
                onClick={() => generate('combo')}
              >
                {generating ? '✦ 宇宙排列中... ✦' : '✦ 隨機生成 ✦'}
              </button>
            </div>

            {/* Aspect type */}
            <div className="card-cosmic-violet text-center">
              <div className="text-3xl mb-4" style={{ textShadow: '0 0 15px hsl(272 70% 55% / 0.5)' }}>♀ × ♂ × 120°</div>
              <h2 className="font-display text-secondary text-lg mb-2" style={{ textShadow: '0 0 20px hsl(272 70% 55% / 0.4)' }}>
                行星 + 行星 + 相位
              </h2>
              <p className="text-muted-foreground text-xs mb-6">
                隨機選擇兩顆行星與一個相位角度，分析行星能量的互動關係。
              </p>
              <button
                className="btn-cosmic-secondary w-full text-sm"
                disabled={generating}
                onClick={() => generate('aspect')}
              >
                {generating ? '✦ 宇宙排列中... ✦' : '✦ 隨機生成 ✦'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
