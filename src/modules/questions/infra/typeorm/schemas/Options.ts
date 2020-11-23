import {
  ObjectID,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ObjectIdColumn,
} from "typeorm";

import Answer from "./Answers";

@Entity("options")
class Option {
  @Column()
  id: number;

  @Column()
  text: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column(type => Answer)
  answers: Answer[];

  // constructor(text: string) {
  //   this.text = text;
  // }
}

export default Option;
