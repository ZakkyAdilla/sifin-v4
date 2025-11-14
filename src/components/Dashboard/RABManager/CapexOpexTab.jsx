import { ProjectInfo } from "./ProjectInfo";
import { CapexSection } from "./CapexSection";
import { OpexSection } from "./OpexSection";

export function CapexOpexTab({ projectData, onUpdateProjectInfo }) {
  return (
    <div className="space-y-6">
      <ProjectInfo projectData={projectData} onUpdate={onUpdateProjectInfo} />
      <CapexSection capexItems={projectData.capex_items} />
      <OpexSection opexItems={projectData.opex_items} />
    </div>
  );
}
