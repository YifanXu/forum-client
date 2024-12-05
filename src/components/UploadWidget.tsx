import { useEffect, useRef, useState } from "react"

export default function UploadWidget ({ children, onUpload }: { children: (open: () => void) => React.ReactNode, onUpload: (target: string) => void }) {
	const cloudinaryRef = useRef<any>(null);
	const widgetRef = useRef<any>(null);

	const [childRender, setChildRender] = useState<React.ReactNode | null>(null)

	useEffect(() => {
		cloudinaryRef.current = (window as any).cloudinary
		widgetRef.current = cloudinaryRef.current.createUploadWidget({
			cloudName: 'dztsw0f2i',
			uploadPreset: 'profile-upload',
			multiple: false,
			cropping: true,
			showSkipCropButton: false,
			croppingAspectRatio: 1.0,
			croppingShowDimensions: true,
			maxImageWidth: 500,
			maxImageHeight: 500,
			clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
			theme: 'purple'
		}, (err: any, res: any) => {
			if (res.event === 'success')
			{
				console.log('upload success', res.info)
				onUpload(res.info.public_id)
			}
		})
		console.log('createWidget', widgetRef.current)
		setChildRender(children(() => widgetRef.current?.open()))
		return () => {
			widgetRef.current.destroy()
		}
	}, [children, onUpload])


	return <>{childRender}</>
}