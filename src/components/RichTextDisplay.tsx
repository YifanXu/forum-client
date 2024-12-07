import ReactQuill from "react-quill"
import './RichTextDisplay.css'

export default function RichTextDisplay({ content, className, limitLine }: { content: string, className?: string, limitLine?: boolean }) {
	return (
		<ReactQuill
			className={'richTextDisplayRoot ' + (limitLine ? 'limitLine ' : '') + (className ?? '')}
			value={content}
			readOnly={true}
			theme={"bubble"}
		/>
	)
}