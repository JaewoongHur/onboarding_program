import { useState } from "react";
import "./App.css";

const TABLE_POSITIONS = {
  0: { x: 343, y: 150 },
  1: { x: 750, y: 520 },
  2: { x: 1350, y: 520 },
  3: { x: 750, y: 910 },
  4: { x: 1350, y: 910 },
};

const WAYPOINTS = {
  T0: { x: 380,  y: 480 },
  T1: { x: 450,  y: 520 },
  T2: { x: 1050, y: 520 },
  T3: { x: 450,  y: 910 },
  T4: { x: 1050, y: 910 },
};

const PATH_MAP = {
  0: {
    0:[],
    1:["T1", 1],
    2:["T1", 1, "T2", 2],
    3:["T0", "T3", 3],
    4:["T1", 1, "T2", "T4", 4]
  },

  1: {
    0:["T1", 0],
    1:[],
    2:["T2", 2],
    3:["T1", "T3", 3],
    4:["T2", "T4", 4]
  },

  2: {
    0:["T2", 1, "T1", 0],
    1:["T2", 1],
    2:[],
    3:["T2", "T4", 3],
    4:["T2", "T4", 4]
  },

  3:{
    0:["T3", "T0", 0],
    1:["T3", "T1", 1],
    2:["T4", "T2", 2],
    3:[],
    4:["T4", 4]
  },

  4:{
    0:["T4", 3, "T3", "T0", 0],
    1:["T4", "T2", 1],
    2:["T4", "T2", 2],
    3:["T4", 3],
    4:[]
  }
}

const lerp = (a, b, t) => a + (b - a) * t;

const animateTo = (start, end, duration, onUpdate, onDone) => {
  const startTime = performance.now();

  const step = (now) => {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / duration, 1);

    const x = lerp(start.x, end.x, t);
    const y = lerp(start.y, end.y, t);

    onUpdate({ x, y });

    if (t < 1) requestAnimationFrame(step);
    else onDone && onDone();
  };

  requestAnimationFrame(step);
};

function App() {
  const [robotPos, setRobotPos] = useState(TABLE_POSITIONS[0]);
  const [target, setTarget] = useState(0);
  const [status, setStatus] = useState("Idle");
  const [lastCmd, setLastCmd] = useState("-");

  const displayTarget = (value) => {
    return value === 0 ? "Origin" : value;
  };



  const go = (dest) => {
    const startId = target;     // 현재 위치 번호 (0~4)
    const pathKeys = PATH_MAP[startId][dest];
    if (!pathKeys) return;

    setTarget(dest);
    setStatus("Moving");
    setLastCmd(`버튼: ${displayTarget(dest)}로 이동`);

    // PATH_MAP에서 waypoint/목적지 좌표를 가져옴
    const points = pathKeys.map(k =>
      typeof k === "string" ? WAYPOINTS[k] : TABLE_POSITIONS[k]
    );

    let current = robotPos;

    const moveNext = (i) => {
      if (i >= points.length) {
        setStatus("Idle");
        return;
      }

      const nextPoint = points[i];

      animateTo(current, nextPoint, 700, setRobotPos, () => {
        current = nextPoint;
        moveNext(i + 1);
      });
    };

    moveNext(0);
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
