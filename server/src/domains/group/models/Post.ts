import { Column, Entity } from "typeorm";

@Entity("post", { schema: "ssul-local" })
export class Post {
  @Column("int", { primary: true, name: "post_id" })
  postId: number;

  @Column("int", { name: "group_id" })
  groupId: number;

  @Column("varchar", { name: "title", length: 100 })
  title: string;

  @Column("varchar", { name: "content", length: 500 })
  content: string;
}
