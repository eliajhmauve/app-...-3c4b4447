import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import OpeningAnimation from '@/components/OpeningAnimation';
import { motion } from 'framer-motion';

const Index = () => {
  const [animDone, setAnimDone] = useState(false);
  const [question, setQuestion] = useState('');
  const navigate = useNavigate();

  const handleComplete = useCallback(() => setAnimDone(true), []);

  const goTo = (path: string) => {
    navigate(path, { state: { question } });
  };

  return (
    <>
      {!animDone && <OpeningAnimation onComplete={handleComplete} />}

      {animDone && (
        <div className="min-h-screen bg-background starfield relative">
          {/* Decorative border */}
          <div className="fixed inset-0 border-4 border-primary/10 pointer-events-none z-40" />

          <div className="container max-w-4xl mx-auto px-4 py-8 md:py-16 relative z-10">
            {/* Header */}
            <motion.header
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs tracking-[0.5em] text-muted-foreground uppercase mb-4">
                ✦ 宇宙能量的軌跡 ✦
              </p>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display title-cosmic tracking-wider mb-4">
                西洋星盤復盤
              </h1>
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="h-px flex-1 max-w-[80px] bg-primary/30" />
                <span className="text-lg zodiac-symbol tracking-[0.3em]">♈♉♊♋♌♍♎♏♐♑♒♓</span>
                <span className="h-px flex-1 max-w-[80px] bg-primary/30" />
              </div>
              <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                行星之間的訊息 · 黃道十二宮的智慧 · 星盤中的生命藍圖
              </p>
              <p className="text-xs text-muted-foreground/60 mt-3 tracking-wider">
                福青施老師 設計
              </p>
            </motion.header>

            {/* Question input */}
            <motion.section
              className="mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="card-cosmic max-w-2xl mx-auto">
                <h2 className="text-lg md:text-xl font-display title-cosmic mb-4">
                  ✦ 你想探索的問題
                </h2>
                <p className="text-muted-foreground text-xs md:text-sm mb-4">
                  寫下你想透過星盤復盤探索的問題，宇宙的能量將為你指引方向。
                </p>
                <textarea
                  className="input-cosmic min-h-[100px] resize-none"
                  placeholder="例如：我在這段關係中的角色是什麼？"
                  value={question}
                  onChange={e => setQuestion(e.target.value)}
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  {['我的人生方向有什麼提醒？', '目前的能量如何？', '這段關係的功課是什麼？'].map(q => (
                    <button
                      key={q}
                      className="text-xs border border-primary/20 text-primary/60 px-3 py-1 hover:bg-primary/10 hover:text-primary transition-colors"
                      onClick={() => setQuestion(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Two entry points */}
            <motion.section
              className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Random mode */}
              <div className="card-cosmic group hover:border-primary/70 transition-colors">
                <div className="text-4xl md:text-5xl mb-4 zodiac-symbol">🎲</div>
                <h2 className="text-xl md:text-2xl font-display title-cosmic mb-3">
                  隨機星盤組合
                </h2>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  讓宇宙為你隨機排列行星、星座與宮位的組合，在意想不到的能量碰撞中獲得啟發。如同宇宙節奏的指引，每一次隨機都是命運的低語。
                </p>
                <button
                  className="btn-cosmic w-full text-sm"
                  onClick={() => goTo('/random')}
                >
                  ✦ 開始隨機探索 ✦
                </button>
              </div>

              {/* Review mode */}
              <div className="card-cosmic-violet group hover:border-secondary/70 transition-colors">
                <div className="text-4xl md:text-5xl mb-4">🔭</div>
                <h2 className="text-xl md:text-2xl font-display text-secondary mb-3" style={{ textShadow: '0 0 20px hsl(272 70% 55% / 0.4)' }}>
                  星盤復盤模式
                </h2>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  手動選擇行星、星座與宮位的組合，深入研究特定的占星配置。這是修煉解盤能力的最佳途徑——反覆練習，逐步掌握星盤解讀的精髓。
                </p>
                <button
                  className="btn-cosmic-secondary w-full text-sm"
                  onClick={() => goTo('/review')}
                >
                  ✦ 開始復盤學習 ✦
                </button>
              </div>
            </motion.section>

            {/* History link */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <button
                className="btn-cosmic-outline text-xs"
                onClick={() => navigate('/history')}
              >
                📜 復盤紀錄庫
              </button>
            </motion.div>

            {/* Footer */}
            <motion.footer
              className="text-center mt-16 md:mt-24 pb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-xs text-muted-foreground/40 tracking-widest">
                ✦ 宇宙能量的星盤觀測台 ✦
              </p>
              <p className="text-[10px] text-muted-foreground/30 mt-2">
                福青施老師 © {new Date().getFullYear()}
              </p>
            </motion.footer>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
