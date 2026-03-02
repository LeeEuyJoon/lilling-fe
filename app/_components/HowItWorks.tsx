import { ArrowRight } from "lucide-react";
import WorkStep from "./WorkStep";
import { StepArrow } from "./StepArrow";

export default function HowItWorks() {
  return (
    <div className="mt-10 mb-10">
      <div className="flex items-center gap-4">
        {/* Step 1 */}
        <WorkStep
          number="01"
          sentence1="URL 붙여넣기"
          sentence2="단축할 긴 링크를 입력창에 붙여넣어요"
        />

        <StepArrow />

        {/* Step 2 */}
        <WorkStep
          number="02"
          sentence1="Convert"
          sentence2="버튼 하나로 짧은 링크가 즉시 완성돼요"
        />

        <StepArrow />

        {/* Step 3 */}
        <WorkStep
          number="03"
          sentence1="공유 & 통계 확인"
          sentence2="어디서나 공유하고 실시간 클릭 통계를 확인해요"
        />
      </div>
    </div>
  );
}
