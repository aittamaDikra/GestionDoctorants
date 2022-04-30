import { IExtraUser } from 'app/entities/extra-user/extra-user.model';
import { IUser } from 'app/entities/user/user.model';

export interface IPublication {
  id?: number;
  titre?: string;
  date?: number;
  description?: string;
  type?: string | null;
  articleContentType?: string | null;
  article?: string | null;
  extraUser?: IExtraUser | null;
  chercheurs?: IUser[] | null;
}

export class Publication implements IPublication {
  constructor(
    public id?: number,
    public titre?: string,
    public date?: number,
    public description?: string,
    public type?: string | null,
    public articleContentType?: string | null,
    public article?: string | null,
    public extraUser?: IExtraUser | null,
    public chercheurs?: IUser[] | null
  ) {}
}

export function getPublicationIdentifier(publication: IPublication): number | undefined {
  return publication.id;
}
