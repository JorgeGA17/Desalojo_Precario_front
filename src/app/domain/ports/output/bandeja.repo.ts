import { Observable } from 'rxjs';
import { BandejaQuery, BandejaResponse } from '../../dto/expediente.dto';

export interface IBandejaRepository {
  listar(query: BandejaQuery): Observable<BandejaResponse>;
  reintentar(id: string): Observable<void>;
  eliminar(id: string): Observable<void>;
}
