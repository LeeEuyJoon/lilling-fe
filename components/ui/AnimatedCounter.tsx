"use client";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
}

// shadcn/ui의 'text-3xl' 클래스는
// font-size: 1.875rem (30px)
// line-height: 2.25rem (36px) 입니다.
// 이 line-height 값을 애니메이션 높이로 사용합니다. (테일윈드 클래스 'h-9')
const DIGIT_HEIGHT = "2.25rem";

export default function AnimatedCounter({ end }: AnimatedCounterProps) {
  // 1. 숫자를 포맷팅하고 (예: 1234 -> "1,234")
  const formattedString = end.toLocaleString();

  // 2. 각 문자(콤마 포함)로 쪼갭니다. (예: ["1", ",", "2", "3", "4"])
  const chars = formattedString.split("");

  return (
    // 3. flex 컨테이너로 문자들을 가로로 정렬합니다.
    <div className="flex text-3xl font-bold tabular-nums">
      {chars.map((char, index) => (
        // 4. 각 문자를 위한 "슬롯" 래퍼입니다.
        //    - h-9: 높이를 고정합니다 (line-height와 동일하게).
        //    - overflow-hidden: 이 슬롯을 벗어나는 숫자는 숨깁니다.
        <div
          key={index} // React 리스트를 위한 고유 키
          className="relative h-9 overflow-hidden"
        >
          {/* 5. AnimatePresence가 문자 변경을 감지합니다. */}
          <AnimatePresence mode="wait">
            {/*
              6. 이게 핵심입니다!
                 key={char}를 사용함으로써,
                 '4'가 '9'로 바뀌면, '4' span은 exit(사라짐)하고 '9' span이 initial/animate(등장)합니다.
                 ','가 ','로 유지되면, key가 같으므로 아무 일도 일어나지 않습니다.
            */}
            <motion.span
              key={char}
              // initial: 슬롯 아래쪽(y: 2.25rem)에서 시작
              initial={{ y: DIGIT_HEIGHT }}
              // animate: 제자리(y: 0)로 올라옴
              animate={{ y: 0 }}
              // exit: 슬롯 위쪽(y: -2.25rem)으로 사라짐
              exit={{ y: `-${DIGIT_HEIGHT}` }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              // transform(y)을 적용하기 위해 inline-block으로 설정
              className="inline-block"
            >
              {/* &nbsp; (공백) 트릭: 
                숫자(고정폭 폰트가 아닌 경우)마다 미세하게 폭이 다를 수 있습니다.
                '1'이 '8'로 바뀔 때 레이아웃이 살짝 흔들릴 수 있죠.
                하지만 이 효과에서는 그 미세한 차이가 오히려 자연스러워서 
                그대로 두는 것이 좋습니다. (만약 폭 고정이 필요하면 'font-mono'를 쓰면 됩니다.)
              */}
              {char}
            </motion.span>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
