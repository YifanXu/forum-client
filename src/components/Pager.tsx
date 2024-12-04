import Pagination from 'react-bootstrap/Pagination'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Pager.css'

function PageItem ({page, handler}: {page: number, handler: (page: number) => void}) {
    return <Pagination.Item onClick={() => handler(page)}>{page}</Pagination.Item>
}

export default function PaginationHelper({ current, max, setPage }: { current: number, max?: number, setPage: (page: number) => void }) {

    if (!max) {
        return <div className='pagerRoot'/>
    }
    return (
        <div className='pagerRoot'>
            <Pagination className='pagination' style={{justifyContent: 'center'}}>
                {current > 1 ? <Pagination.First onClick={() => setPage(1)} key="first"/> : null}
                {current > 1 ? <Pagination.Prev onClick={() => setPage(current-1)} key="elip1"/> : null}

                {current > 1 ? <PageItem page={current - 1} handler={setPage} key="prev1"/> : null}
                <Pagination.Item active key="current">{current}</Pagination.Item>
                {current < max - 1 ? <PageItem page={current + 1} handler={setPage} key="next1"/> : null}

                {current < max - 1 ? <Pagination.Next onClick={() => setPage(current+1)} key="elip2" /> : null}
                {current < max - 1 ? <Pagination.Last onClick={() => setPage(max)} key="last"/> : null}
            </Pagination>
            <div>Page {current} of {max}</div>
            <Form className='paginationForm'>
                <Row>
                    <Col sm={9} className='col'>
                        <Form.Control placeholder="page" type="number"/>
                    </Col>
                    <Col sm={3} className='col'>
                        <Button variant='outline-light'>Go</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}