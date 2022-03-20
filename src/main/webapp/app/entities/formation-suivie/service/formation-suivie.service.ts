import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFormationSuivie, getFormationSuivieIdentifier } from '../formation-suivie.model';

export type EntityResponseType = HttpResponse<IFormationSuivie>;
export type EntityArrayResponseType = HttpResponse<IFormationSuivie[]>;

@Injectable({ providedIn: 'root' })
export class FormationSuivieService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/formation-suivies');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(formationSuivie: IFormationSuivie): Observable<EntityResponseType> {
    return this.http.post<IFormationSuivie>(this.resourceUrl, formationSuivie, { observe: 'response' });
  }

  update(formationSuivie: IFormationSuivie): Observable<EntityResponseType> {
    return this.http.put<IFormationSuivie>(
      `${this.resourceUrl}/${getFormationSuivieIdentifier(formationSuivie) as number}`,
      formationSuivie,
      { observe: 'response' }
    );
  }

  partialUpdate(formationSuivie: IFormationSuivie): Observable<EntityResponseType> {
    return this.http.patch<IFormationSuivie>(
      `${this.resourceUrl}/${getFormationSuivieIdentifier(formationSuivie) as number}`,
      formationSuivie,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFormationSuivie>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFormationSuivie[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addFormationSuivieToCollectionIfMissing(
    formationSuivieCollection: IFormationSuivie[],
    ...formationSuiviesToCheck: (IFormationSuivie | null | undefined)[]
  ): IFormationSuivie[] {
    const formationSuivies: IFormationSuivie[] = formationSuiviesToCheck.filter(isPresent);
    if (formationSuivies.length > 0) {
      const formationSuivieCollectionIdentifiers = formationSuivieCollection.map(
        formationSuivieItem => getFormationSuivieIdentifier(formationSuivieItem)!
      );
      const formationSuiviesToAdd = formationSuivies.filter(formationSuivieItem => {
        const formationSuivieIdentifier = getFormationSuivieIdentifier(formationSuivieItem);
        if (formationSuivieIdentifier == null || formationSuivieCollectionIdentifiers.includes(formationSuivieIdentifier)) {
          return false;
        }
        formationSuivieCollectionIdentifiers.push(formationSuivieIdentifier);
        return true;
      });
      return [...formationSuiviesToAdd, ...formationSuivieCollection];
    }
    return formationSuivieCollection;
  }
}
