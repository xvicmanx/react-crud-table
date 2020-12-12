import bcc from 'bem-react-component-creator';

const { block, element } = bcc('crud-table-pagination');

export const Pagination = block('div');

Pagination.displayName = 'Pagination';

Pagination.Link = element('button', 'link');
Pagination.Link.displayName = 'PaginationLink';

Pagination.Prev = element('button', 'previous');
Pagination.Prev.displayName = 'PaginationPrev';

Pagination.Next = element('button', 'next');
Pagination.Next.displayName = 'PaginationNext';

export default { Pagination };
