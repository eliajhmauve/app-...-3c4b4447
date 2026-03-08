import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getReports, deleteReport, clearHistory } from '@/utils/history';
import type { ReportData } from '@/utils/reportGenerator';

export default function History() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<ReportData[]>([]);

  useEffect(() => {
    setReports(getReports());
  }, []);

  const handleDelete = (id: string) => {
    deleteReport(id);
    setReports(getReports());
  };

  const handleClear = () => {
    if (confirm('確定要清除所有紀錄嗎？')) {
      clearHistory();
      setReports([]);
    }
  };

  return (
    <div className="min-h-screen bg-background starfield">
      <div className="fixed inset-0 border-4 border-primary/10 pointer-events-none z-40" />
      <div className="container max-w-3xl mx-auto px-4 py-8 md:py-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <button className="btn-cosmic-outline text-xs mb-8" onClick={() => navigate('/')}>
            ← 返回首頁
          </button>

          <h1 className="text-2xl md:text-4xl font-display title-cosmic text-center mb-2">
            📜 復盤紀錄庫
          </h1>
          <p className="text-center text-muted-foreground text-sm mb-8">
            回顧過去的占星案例，逐步提升解盤能力
          </p>

          {reports.length === 0 ? (
            <div className="card-cosmic text-center py-12">
              <p className="text-muted-foreground text-sm mb-4">尚無復盤紀錄</p>
              <button className="btn-cosmic text-xs" onClick={() => navigate('/random')}>
                開始第一次探索
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-end mb-4">
                <button
                  className="text-xs text-destructive/60 hover:text-destructive transition-colors"
                  onClick={handleClear}
                >
                  清除所有紀錄
                </button>
              </div>

              <div className="space-y-4">
                {reports.map((r, i) => (
                  <motion.div
                    key={r.id}
                    className={`${r.type === 'combination' ? 'card-cosmic' : 'card-cosmic-violet'} cursor-pointer hover:scale-[1.01] transition-transform`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => navigate('/report', { state: { report: r } })}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-1">{r.date}</p>
                        <h3 className={`font-display text-base mb-1 ${r.type === 'combination' ? 'title-cosmic' : 'text-secondary'}`}>
                          {r.title}
                        </h3>
                        {r.question && (
                          <p className="text-xs text-muted-foreground truncate">
                            問題：{r.question}
                          </p>
                        )}
                        <span className={`inline-block text-[10px] mt-2 px-2 py-0.5 border ${r.type === 'combination' ? 'border-primary/30 text-primary/60' : 'border-secondary/30 text-secondary/60'}`}>
                          {r.type === 'combination' ? '行星 × 星座 × 宮位' : '行星 × 行星 × 相位'}
                        </span>
                      </div>
                      <button
                        className="text-muted-foreground/40 hover:text-destructive text-xs transition-colors shrink-0"
                        onClick={e => { e.stopPropagation(); handleDelete(r.id); }}
                      >
                        ✕
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          <p className="text-[10px] text-muted-foreground/30 text-center mt-12 tracking-widest">
            ✦ 福青施老師 · 西洋星盤復盤學習 ✦
          </p>
        </motion.div>
      </div>
    </div>
  );
}
