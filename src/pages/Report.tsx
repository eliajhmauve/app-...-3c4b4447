import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { ReportData } from '@/utils/reportGenerator';

export default function Report() {
  const location = useLocation();
  const navigate = useNavigate();
  const report = (location.state as any)?.report as ReportData | undefined;

  if (!report) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">找不到報告資料</p>
          <button className="btn-cosmic-outline text-xs" onClick={() => navigate('/')}>返回首頁</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background starfield">
      <div className="fixed inset-0 border-4 border-primary/10 pointer-events-none z-40" />
      <div className="container max-w-3xl mx-auto px-4 py-8 md:py-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex gap-2 mb-8">
            <button className="btn-cosmic-outline text-xs" onClick={() => navigate(-1)}>
              ← 返回
            </button>
            <button className="btn-cosmic-outline text-xs" onClick={() => navigate('/')}>
              首頁
            </button>
          </div>

          {/* Report header */}
          <div className="card-cosmic mb-8 text-center">
            <p className="text-xs text-muted-foreground tracking-widest mb-2">
              ✦ 西洋占星解析報告 ✦
            </p>
            <h1 className="text-2xl md:text-3xl font-display title-cosmic mb-3">
              {report.title}
            </h1>
            <p className="text-xs text-muted-foreground">
              {report.date} · 福青施老師
            </p>
            {report.question && (
              <div className="mt-4 border-t border-primary/20 pt-4">
                <p className="text-xs text-muted-foreground">探索的問題</p>
                <p className="text-primary text-sm mt-1">「{report.question}」</p>
              </div>
            )}

            {/* Combo summary */}
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {report.type === 'combination' && (
                <>
                  <span className="border border-primary/30 px-3 py-1 text-xs text-primary">
                    {report.planet?.symbol} {report.planet?.name}
                  </span>
                  <span className="text-primary/40">×</span>
                  <span className="border border-primary/30 px-3 py-1 text-xs text-primary">
                    {report.sign?.symbol} {report.sign?.name}
                  </span>
                  <span className="text-primary/40">×</span>
                  <span className="border border-primary/30 px-3 py-1 text-xs text-primary">
                    {report.house?.name}
                  </span>
                </>
              )}
              {report.type === 'aspect' && (
                <>
                  <span className="border border-secondary/30 px-3 py-1 text-xs text-secondary">
                    {report.planet1?.symbol} {report.planet1?.name}
                  </span>
                  <span className="text-secondary/40">×</span>
                  <span className="border border-secondary/30 px-3 py-1 text-xs text-secondary">
                    {report.planet2?.symbol} {report.planet2?.name}
                  </span>
                  <span className="text-secondary/40">×</span>
                  <span className="border border-secondary/30 px-3 py-1 text-xs text-secondary">
                    {report.aspect?.name} {report.aspect?.degree}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Report sections */}
          {report.sections.map((section, i) => (
            <motion.div
              key={i}
              className="report-section card-cosmic mb-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
            >
              <h2>{section.title}</h2>
              {section.content.split('\n\n').map((para, j) => {
                if (para.startsWith('【') && para.includes('】')) {
                  const titleEnd = para.indexOf('】');
                  return (
                    <div key={j}>
                      <h3>{para.slice(0, titleEnd + 1)}</h3>
                      <p>{para.slice(titleEnd + 1).trim()}</p>
                    </div>
                  );
                }
                if (para.startsWith('「') || para.startsWith('『')) {
                  return <blockquote key={j}>{para}</blockquote>;
                }
                return <p key={j}>{para}</p>;
              })}
            </motion.div>
          ))}

          {/* Footer */}
          <div className="text-center mt-12 mb-8">
            <div className="flex flex-wrap justify-center gap-3">
              <button className="btn-cosmic text-xs" onClick={() => navigate('/random', { state: { question: report.question } })}>
                🎲 再次隨機
              </button>
              <button className="btn-cosmic-secondary text-xs" onClick={() => navigate('/review', { state: { question: report.question } })}>
                🔭 手動復盤
              </button>
              <button className="btn-cosmic-outline text-xs" onClick={() => navigate('/history')}>
                📜 紀錄庫
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground/30 mt-8 tracking-widest">
              ✦ 福青施老師 · 西洋星盤復盤學習 ✦
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
