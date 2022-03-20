import { IEquipe } from 'app/entities/equipe/equipe.model';

export interface ILaboratoire {
  id?: number;
  nom?: string;
  abreviation?: string;
  equipes?: IEquipe[] | null;
}

export class Laboratoire implements ILaboratoire {
  constructor(public id?: number, public nom?: string, public abreviation?: string, public equipes?: IEquipe[] | null) {}
}

export function getLaboratoireIdentifier(laboratoire: ILaboratoire): number | undefined {
  return laboratoire.id;
}
