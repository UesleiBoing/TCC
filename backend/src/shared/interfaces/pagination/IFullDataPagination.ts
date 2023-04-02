import OptionalParameters from '@shared/core/OptionalParameters';
import Pagination from '@shared/core/Pagination';

export default interface IFullDataPagination {
  pag: Pagination;
  filter: OptionalParameters;
}
