export default function ProfilePic ({ src, size }: {src: string, size?: string | number}) {
	return <img className="profilePic" src={src} style={{width: size ?? 150, height: size ?? 150}}/>
}