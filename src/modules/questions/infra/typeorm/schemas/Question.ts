import {
  ObjectID,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ObjectIdColumn,
} from "typeorm";
import Option from "./Options";

@Entity("questions")
class Question {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ unique: true })
  easy_id: string;

  @Column()
  text: string;

  @Column("uuid")
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column(type => Option)
  options: Option[];
}

export default Question;
