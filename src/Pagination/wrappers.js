import bcc from 'bem-react-component-creator';

const { block, element } = bcc('crud-table-pagination');

export const Pagination = block('div');

Pagination.Link = element('button', 'link');
Pagination.Prev = element('button', 'previous');
Pagination.Next = element('button', 'next');

export default { Pagination };
