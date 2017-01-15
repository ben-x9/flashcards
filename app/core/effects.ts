export type Effect = Goto | null;

export interface Goto {
  type: 'GOTO';
  path: string;
}
