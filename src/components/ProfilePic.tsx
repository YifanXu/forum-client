import { useContext, useEffect, useState} from "react"
import { ApiContext } from "../ApiContext"
import { AdvancedImage, lazyload } from '@cloudinary/react';
import './ProfilePic.css'
import { CloudinaryImage } from "@cloudinary/url-gen";

export default function ProfilePic ({ src, size, onClick }: {src: string, size?: string | number, onClick?: () => void}) {
	const api = useContext(ApiContext)

	const [img, setImg] = useState<CloudinaryImage | null>(null)
	useEffect(() => {
		setImg(api.cloudinary.image(src).format('auto').quality('auto'))
	}, [src, api.cloudinary])

	return <div className={'profilePic' + (onClick ? ' clickable' : '')} onClick={onClick}>
		{ 
			img
			? <AdvancedImage
				style={{width: size ?? 150, height: size ?? 150 }} 
				cldImg={img}
				plugins={[lazyload()]}
			/>
			: null
		}
	</div>
}