import { Column, Entity, OneToMany } from "typeorm";
import { UsingTechStack } from "./UsingTechStack";

@Entity("tech_stack", { schema: "ssul-local" })
export class TechStack {
  @Column("int", { primary: true, name: "tech_stack_id" })
  techStackId: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @OneToMany(() => UsingTechStack, (usingTechStack) => usingTechStack.techStack)
  usingTechStacks: UsingTechStack[];
}
