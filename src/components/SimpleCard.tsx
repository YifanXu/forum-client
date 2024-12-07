import ListGroup from "react-bootstrap/ListGroup";

export default function SimpleCard ({ title, children, direct }: { title: string, children?: React.ReactNode, direct?: boolean }) {
	return (
		<ListGroup className='simpleCard'>
			<ListGroup.Item active style={{color: 'var(--primary-fade)', fontWeight: 'bold'}} key="header">
				{title}
			</ListGroup.Item>
			{ direct? children : <ListGroup.Item>{children}</ListGroup.Item>}
		</ListGroup>
	)
}