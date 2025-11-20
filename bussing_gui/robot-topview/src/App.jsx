import { useState } from "react";
import "./App.css";

const TABLE_POSITIONS = {
  0: { x: 343, y: 150 },
  1: { x: 745, y: 485 },
  2: { x: 1335, y: 485 },
  3: { x: 745, y: 870 },
  4: { x: 1335, y: 870 },
};

const WAYPOINTS = {
  T1: { x: 548,  y: 485 },
  T2: { x: 1040, y: 485 },
  T3: { x: 548,  y: 870 },
  T4: { x: 1040, y: 870 },
};

const PATH_MAP = {
  0: {
    0:[],
    1:["T1", 1],
    2:["T1", 1, "T2", 2],
    3:["T3", 3],
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
    0:["T3", 0],
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
    return value === 0 ? "퇴식구" : value;
  };



  const go = (dest) => {
    if (status === "Moving") return;

    const startId = target;
    const pathKeys = PATH_MAP[startId][dest];
    if (!pathKeys) return;

    setTarget(dest);
    setStatus("Moving");
    dest === 0
      ? setLastCmd(`${displayTarget(dest)}로 이동`)
      : setLastCmd(`테이블 ${displayTarget(dest)}로 이동`);

    const points = pathKeys.map(k =>
      typeof k === "string" ? WAYPOINTS[k] : TABLE_POSITIONS[k]
    );

    let current = robotPos;

    // ★ 속도(px / sec)
    const SPEED = 100;

    const moveNext = (i) => {
      if (i >= points.length) {
        setStatus("Idle");
        return;
      }

      const nextPoint = points[i];

      // ★ 현재 위치와 다음 위치 사이 거리 계산
      const dx = nextPoint.x - current.x;
      const dy = nextPoint.y - current.y;
      const dist = Math.hypot(dx, dy);      // = sqrt(dx*dx + dy*dy)

      // ★ 이 구간에서 걸릴 시간(ms)
      const duration = (dist / SPEED) * 1000;

      animateTo(current, nextPoint, duration, setRobotPos, () => {
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
        <div className="return">퇴식구</div>
        <div className="serving">배식구</div>
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
          {[1, 2, 3, 4].map((id) => (
            <div className={`table-block table-${id}`} key={id}>
              {/* 왼쪽 의자 2개 */}
              <div className="seats-column seats-left">
                <div className="seat" />
                <div className="seat" />
              </div>

              {/* 테이블 본체 */}
              <div className="table-rect">{id}</div>

              {/* 오른쪽 의자 2개 */}
              <div className="seats-column seats-right">
                <div className="seat" />
                <div className="seat" />
              </div>
            </div>
          ))}
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
              <button className="origin-btn" disabled={status === "Moving"} onClick={() => go(0)}>퇴식구</button>
            </div>

            <div className="row row-12">
              <button disabled={status === "Moving"} onClick={() => go(1)}>1</button>
              <button disabled={status === "Moving"} onClick={() => go(2)}>2</button>
            </div>

            <div className="row row-34">
              <button disabled={status === "Moving"} onClick={() => go(3)}>3</button>
              <button disabled={status === "Moving"} onClick={() => go(4)}>4</button>
            </div>
        </div>

           </div>
        </div>
      </div>
    </div>
  );
}

export default App;
