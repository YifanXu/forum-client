import Pagination from 'react-bootstrap/Pagination'

function PageItem ({page, handler}: {page: number, handler: (page: number) => void}) {
    return <Pagination.Item onClick={() => handler(page)}>{page}</Pagination.Item>
}

export default function PaginationHelper({ current, max, setPage }: { current: number, max: number, setPage: (page: number) => void }) {

    return (
        <Pagination className='pagination' style={{justifyContent: 'center'}}>
            {current > 3 ? <PageItem page={1} handler={setPage}/> : null}
            {current > 3 ? <Pagination.Ellipsis /> : null}

            {current > 2 ? <PageItem page={current - 2} handler={setPage}/> : null}
            {current > 1 ? <PageItem page={current - 1} handler={setPage}/> : null}
            <Pagination.Item active>{current}</Pagination.Item>
            {current < max - 1 ? <PageItem page={current + 1} handler={setPage}/> : null}
            {current < max ? <PageItem page={current + 2} handler={setPage}/> : null}

            {current < max - 2 ? <Pagination.Ellipsis /> : null}
            {current < max - 2 ? <PageItem page={max} handler={setPage}/> : null}
        </Pagination>
    )
}