import {
  ObjectID,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ObjectIdColumn,
} from "typeorm";

@Entity("notifications")
class Question {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  text: string;

  @Column("uuid")
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Question;
