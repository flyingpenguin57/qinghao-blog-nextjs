export type BlockType = "T" | "S" | "ST" | "P" | "C" | "IMG";

export interface Block {
  type: BlockType;   
  content: string;
}