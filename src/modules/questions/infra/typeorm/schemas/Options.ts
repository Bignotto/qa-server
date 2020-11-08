import {
  ObjectID,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ObjectIdColumn,
} from "typeorm";

@Entity("options")
class Option {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  text: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(text: string) {
    this.text = text;
  }
}

export default Option;
