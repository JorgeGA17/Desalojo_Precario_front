import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BandejaQuery, BandejaResponse } from '../domain/dto/expediente.dto';
import { BANDEJA_REPO } from '../infrastructure/security/tokens/repositories.tokens'; 
import { IBandejaRepository } from '../domain/ports/output/bandeja.repo';                      

@Injectable()
export class ListarBandejaUC {
  private repo = inject<IBandejaRepository>(BANDEJA_REPO); 

  run(q: BandejaQuery): Observable<BandejaResponse> {
    return this.repo.listar(q);
  }
}
