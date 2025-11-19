import { useState } from "react";
import "./App.css";

const TABLE_POSITIONS = {
  0: { x: 343, y: 150 },
  1: { x: 750, y: 520 },
  2: { x: 1350, y: 520 },
  3: { x: 750, y: 910 },
  4: { x: 1350, y: 910 },
};

function App() {
  const [robotPos, setRobotPos] = useState(TABLE_POSITIONS[0]);
  const [target, setTarget] = useState(0);
  const [status, setStatus] = useState("Idle");
  const [lastCmd, setLastCmd] = useState("-");


const go = (dest) => {
  const pos = TABLE_POSITIONS[dest];

  // 표시용 target
  setTarget(dest === 0 ? "Origin" : dest);

  setStatus("Moving");
  setLastCmd(`버튼: ${dest === 0 ? "Origin" : dest}로 이동`);

  setRobotPos(pos);

  setTimeout(() => {
    setStatus("Idle");
  }, 800);
};

  const displayTarget = (value) => {
  return value === 0 ? "Origin" : value;
};



  return (
    <div className="map-container">
      {/* 상단 TopView 영역 */}
      <div className="topview">
        <div className="return">return</div>
        <div className="kitchen">주방 </div>
        <div className="counter">카운터</div>

        {/* 로봇 점 */}
        <div
          className="robot-dot"
          style={{
            transform: `translate(${robotPos.x}px, ${robotPos.y}px)`,
          }}
        />

        {/* 테이블 2×2 */}
        <div className="tables">
          <div className="table t1">1</div>
          <div className="table t2">2</div>
          <div className="table t3">3</div>
          <div className="table t4">4</div>
        </div>

        {/* 왼쪽 아래 작은 패널 */}
        <div className="control-overlay">
          <div className="highlight-panel">{displayTarget(target)}</div>
          <div className="left-panel">
            <div className="panel-status">
              <div>현재 이동 목표: {displayTarget(target)}</div>
              <div>로봇 상태: {status}</div>
              <div>최근 LLM/명령: {lastCmd}</div>
          </div>

          <div className="panel-buttons">

            <div className="row origin-row">
              <button className="origin-btn" onClick={() => go(0)}>Origin</button>
            </div>

            <div className="row row-12">
              <button onClick={() => go(1)}>1</button>
              <button onClick={() => go(2)}>2</button>
            </div>

            <div className="row row-34">
              <button onClick={() => go(3)}>3</button>
              <button onClick={() => go(4)}>4</button>
            </div>
        </div>

           </div>
        </div>
      </div>
    </div>
  );
}

export default App;
