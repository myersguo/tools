import React, { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';

// 垃圾类型定义
type GarbageCategory = 'recyclable' | 'hazardous' | 'kitchen' | 'other';

interface GarbageItem {
  id: number;
  name: string;
  emoji: string;
  category: GarbageCategory;
  position: number;
}

interface CodeBlock {
  id: string;
  type: 'condition' | 'action';
  condition?: string;
  action?: GarbageCategory;
  label: string;
}

interface ProgramBlock {
  id: string;
  condition: string;
  action: GarbageCategory;
}

// 垃圾数据库
const garbageDatabase: Omit<GarbageItem, 'id' | 'position'>[] = [
  // 可回收垃圾
  { name: '塑料瓶', emoji: '🧴', category: 'recyclable' },
  { name: '易拉罐', emoji: '🥫', category: 'recyclable' },
  { name: '旧报纸', emoji: '📰', category: 'recyclable' },
  { name: '纸箱', emoji: '📦', category: 'recyclable' },
  { name: '玻璃瓶', emoji: '🍾', category: 'recyclable' },
  { name: '旧衣服', emoji: '👕', category: 'recyclable' },
  // 有害垃圾
  { name: '废电池', emoji: '🔋', category: 'hazardous' },
  { name: '过期药品', emoji: '💊', category: 'hazardous' },
  { name: '灯泡', emoji: '💡', category: 'hazardous' },
  { name: '油漆桶', emoji: '🪣', category: 'hazardous' },
  // 厨余垃圾
  { name: '剩菜剩饭', emoji: '🍚', category: 'kitchen' },
  { name: '果皮', emoji: '🍌', category: 'kitchen' },
  { name: '菜叶', emoji: '🥬', category: 'kitchen' },
  { name: '蛋壳', emoji: '🥚', category: 'kitchen' },
  { name: '鱼骨', emoji: '🐟', category: 'kitchen' },
  // 其他垃圾
  { name: '烟蒂', emoji: '🚬', category: 'other' },
  { name: '尿布', emoji: '🧷', category: 'other' },
  { name: '陶瓷碎片', emoji: '🏺', category: 'other' },
  { name: '污损纸张', emoji: '🧻', category: 'other' },
  { name: '一次性餐具', emoji: '🥢', category: 'other' },
];

// 垃圾桶配置
const bins: { category: GarbageCategory; name: string; color: string; emoji: string }[] = [
  { category: 'recyclable', name: '可回收', color: '#2196F3', emoji: '♻️' },
  { category: 'hazardous', name: '有害', color: '#F44336', emoji: '☠️' },
  { category: 'kitchen', name: '厨余', color: '#4CAF50', emoji: '🥗' },
  { category: 'other', name: '其他', color: '#9E9E9E', emoji: '🗑️' },
];

// 条件代码块
const conditionBlocks: CodeBlock[] = [
  { id: 'cond-recyclable', type: 'condition', condition: 'recyclable', label: '如果是可回收垃圾' },
  { id: 'cond-hazardous', type: 'condition', condition: 'hazardous', label: '如果是有害垃圾' },
  { id: 'cond-kitchen', type: 'condition', condition: 'kitchen', label: '如果是厨余垃圾' },
  { id: 'cond-other', type: 'condition', condition: 'other', label: '如果是其他垃圾' },
];

// 动作代码块
const actionBlocks: CodeBlock[] = [
  { id: 'act-recyclable', type: 'action', action: 'recyclable', label: '投入可回收桶' },
  { id: 'act-hazardous', type: 'action', action: 'hazardous', label: '投入有害垃圾桶' },
  { id: 'act-kitchen', type: 'action', action: 'kitchen', label: '投入厨余垃圾桶' },
  { id: 'act-other', type: 'action', action: 'other', label: '投入其他垃圾桶' },
];

function App() {
  const [garbage, setGarbage] = useState<GarbageItem | null>(null);
  const [program, setProgram] = useState<ProgramBlock[]>([]);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [sortingAnimation, setSortingAnimation] = useState<{ active: boolean; targetBin: GarbageCategory | null }>({ active: false, targetBin: null });
  const [draggedBlock, setDraggedBlock] = useState<CodeBlock | null>(null);
  const [pendingCondition, setPendingCondition] = useState<string | null>(null);
  const garbageIdRef = useRef(0);

  // 生成随机垃圾
  const generateGarbage = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * garbageDatabase.length);
    const item = garbageDatabase[randomIndex];
    garbageIdRef.current += 1;
    return {
      ...item,
      id: garbageIdRef.current,
      position: 0,
    };
  }, []);

  // 执行程序判断
  const executeProgram = useCallback((item: GarbageItem): GarbageCategory | null => {
    for (const block of program) {
      if (block.condition === item.category) {
        return block.action;
      }
    }
    return null;
  }, [program]);

  // 分拣垃圾
  const sortGarbage = useCallback(() => {
    if (!garbage || sortingAnimation.active) return;

    const targetBin = executeProgram(garbage);

    if (targetBin === null) {
      setMessage({ text: '没有匹配的规则！请添加对应的程序块', type: 'error' });
      return;
    }

    setSortingAnimation({ active: true, targetBin });

    setTimeout(() => {
      if (targetBin === garbage.category) {
        setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
        setMessage({ text: `正确！${garbage.name}是${bins.find(b => b.category === garbage.category)?.name}垃圾`, type: 'success' });
      } else {
        setScore(prev => ({ ...prev, wrong: prev.wrong + 1 }));
        setMessage({ text: `错误！${garbage.name}应该是${bins.find(b => b.category === garbage.category)?.name}垃圾`, type: 'error' });
      }

      setSortingAnimation({ active: false, targetBin: null });
      setGarbage(generateGarbage());
    }, 800);
  }, [garbage, executeProgram, generateGarbage, sortingAnimation.active]);

  // 自动运行
  useEffect(() => {
    if (!isRunning || !garbage || program.length === 0) return;

    const timer = setTimeout(() => {
      sortGarbage();
    }, 1500);

    return () => clearTimeout(timer);
  }, [isRunning, garbage, program.length, sortGarbage]);

  // 初始化垃圾
  useEffect(() => {
    if (!garbage) {
      setGarbage(generateGarbage());
    }
  }, [garbage, generateGarbage]);

  // 清除消息
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // 拖拽处理
  const handleDragStart = (block: CodeBlock) => {
    setDraggedBlock(block);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropOnProgram = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedBlock) return;

    if (draggedBlock.type === 'condition') {
      setPendingCondition(draggedBlock.condition!);
      setMessage({ text: '请选择对应的动作', type: 'info' });
    } else if (draggedBlock.type === 'action' && pendingCondition) {
      const newBlock: ProgramBlock = {
        id: `prog-${Date.now()}`,
        condition: pendingCondition,
        action: draggedBlock.action!,
      };
      setProgram(prev => [...prev, newBlock]);
      setPendingCondition(null);
      setMessage({ text: '程序块添加成功！', type: 'success' });
    } else if (draggedBlock.type === 'action' && !pendingCondition) {
      setMessage({ text: '请先添加条件块！', type: 'error' });
    }

    setDraggedBlock(null);
  };

  const removeBlock = (id: string) => {
    setProgram(prev => prev.filter(b => b.id !== id));
  };

  const clearProgram = () => {
    setProgram([]);
    setPendingCondition(null);
  };

  const getBlockColor = (category: string) => {
    return bins.find(b => b.category === category)?.color || '#666';
  };

  return (
    <div className="app">
      <header className="header">
        <h1>智能垃圾分拣系统</h1>
        <p>通过图形化编程，让垃圾自动分类！</p>
      </header>

      <div className="main-content">
        {/* 传送带区域 */}
        <div className="conveyor-section">
          <div className="score-board">
            <span className="correct">正确: {score.correct}</span>
            <span className="wrong">错误: {score.wrong}</span>
          </div>

          <div className="conveyor-belt">
            <div className="belt-track">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="belt-segment" />
              ))}
            </div>

            {garbage && (
              <div
                className={`garbage-item ${sortingAnimation.active ? 'sorting' : ''}`}
                style={{
                  '--target-bin-index': sortingAnimation.targetBin ? bins.findIndex(b => b.category === sortingAnimation.targetBin) : 0
                } as React.CSSProperties}
              >
                <span className="garbage-emoji">{garbage.emoji}</span>
                <span className="garbage-name">{garbage.name}</span>
              </div>
            )}
          </div>

          <div className="bins-container">
            {bins.map((bin, index) => (
              <div
                key={bin.category}
                className={`bin ${sortingAnimation.targetBin === bin.category ? 'receiving' : ''}`}
                style={{ '--bin-color': bin.color } as React.CSSProperties}
              >
                <div className="bin-lid" />
                <div className="bin-body">
                  <span className="bin-emoji">{bin.emoji}</span>
                  <span className="bin-name">{bin.name}</span>
                </div>
              </div>
            ))}
          </div>

          {message && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <div className="controls">
            <button
              className="btn btn-primary"
              onClick={() => setIsRunning(!isRunning)}
              disabled={program.length === 0}
            >
              {isRunning ? '暂停' : '自动运行'}
            </button>
            <button
              className="btn btn-secondary"
              onClick={sortGarbage}
              disabled={sortingAnimation.active || !garbage}
            >
              手动分拣
            </button>
            <button
              className="btn btn-outline"
              onClick={() => setGarbage(generateGarbage())}
              disabled={sortingAnimation.active}
            >
              下一个
            </button>
          </div>
        </div>

        {/* 编程区域 */}
        <div className="programming-section">
          <h2>图形化编程区</h2>

          <div className="code-blocks-container">
            <div className="block-category">
              <h3>条件块</h3>
              <div className="blocks-list">
                {conditionBlocks.map(block => (
                  <div
                    key={block.id}
                    className="code-block condition-block"
                    draggable
                    onDragStart={() => handleDragStart(block)}
                    style={{ '--block-color': getBlockColor(block.condition!) } as React.CSSProperties}
                  >
                    {block.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="block-category">
              <h3>动作块</h3>
              <div className="blocks-list">
                {actionBlocks.map(block => (
                  <div
                    key={block.id}
                    className="code-block action-block"
                    draggable
                    onDragStart={() => handleDragStart(block)}
                    style={{ '--block-color': getBlockColor(block.action!) } as React.CSSProperties}
                  >
                    {block.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`program-area ${pendingCondition ? 'waiting-action' : ''}`}
            onDragOver={handleDragOver}
            onDrop={handleDropOnProgram}
          >
            <div className="program-header">
              <h3>我的程序</h3>
              <button className="btn btn-small btn-danger" onClick={clearProgram}>
                清空
              </button>
            </div>

            {pendingCondition && (
              <div className="pending-block" style={{ '--block-color': getBlockColor(pendingCondition) } as React.CSSProperties}>
                {conditionBlocks.find(b => b.condition === pendingCondition)?.label}
                <span className="arrow">→</span>
                <span className="placeholder">拖入动作块...</span>
              </div>
            )}

            {program.length === 0 && !pendingCondition ? (
              <div className="empty-program">
                <p>将代码块拖到这里组成程序</p>
                <p className="hint">先拖入条件块，再拖入动作块</p>
              </div>
            ) : (
              <div className="program-blocks">
                {program.map(block => (
                  <div key={block.id} className="program-block">
                    <div
                      className="condition-part"
                      style={{ '--block-color': getBlockColor(block.condition) } as React.CSSProperties}
                    >
                      {conditionBlocks.find(b => b.condition === block.condition)?.label}
                    </div>
                    <span className="arrow">→</span>
                    <div
                      className="action-part"
                      style={{ '--block-color': getBlockColor(block.action) } as React.CSSProperties}
                    >
                      {actionBlocks.find(b => b.action === block.action)?.label}
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeBlock(block.id)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="instructions">
            <h3>使用说明</h3>
            <ol>
              <li>从左侧拖拽<strong>条件块</strong>到"我的程序"区域</li>
              <li>再拖拽对应的<strong>动作块</strong>完成规则</li>
              <li>添加所有四种垃圾的分类规则</li>
              <li>点击"自动运行"或"手动分拣"测试程序</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
