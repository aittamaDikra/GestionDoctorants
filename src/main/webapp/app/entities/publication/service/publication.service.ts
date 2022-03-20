import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPublication, getPublicationIdentifier } from '../publication.model';

export type EntityResponseType = HttpResponse<IPublication>;
export type EntityArrayResponseType = HttpResponse<IPublication[]>;

@Injectable({ providedIn: 'root' })
export class PublicationService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/publications');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(publication: IPublication): Observable<EntityResponseType> {
    return this.http.post<IPublication>(this.resourceUrl, publication, { observe: 'response' });
  }

  update(publication: IPublication): Observable<EntityResponseType> {
    return this.http.put<IPublication>(`${this.resourceUrl}/${getPublicationIdentifier(publication) as number}`, publication, {
      observe: 'response',
    });
  }

  partialUpdate(publication: IPublication): Observable<EntityResponseType> {
    return this.http.patch<IPublication>(`${this.resourceUrl}/${getPublicationIdentifier(publication) as number}`, publication, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPublication>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPublication[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPublicationToCollectionIfMissing(
    publicationCollection: IPublication[],
    ...publicationsToCheck: (IPublication | null | undefined)[]
  ): IPublication[] {
    const publications: IPublication[] = publicationsToCheck.filter(isPresent);
    if (publications.length > 0) {
      const publicationCollectionIdentifiers = publicationCollection.map(publicationItem => getPublicationIdentifier(publicationItem)!);
      const publicationsToAdd = publications.filter(publicationItem => {
        const publicationIdentifier = getPublicationIdentifier(publicationItem);
        if (publicationIdentifier == null || publicationCollectionIdentifiers.includes(publicationIdentifier)) {
          return false;
        }
        publicationCollectionIdentifiers.push(publicationIdentifier);
        return true;
      });
      return [...publicationsToAdd, ...publicationCollection];
    }
    return publicationCollection;
  }
}
