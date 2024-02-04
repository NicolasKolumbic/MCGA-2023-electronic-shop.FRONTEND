import { Feature } from "@/models/feature"

export interface Props {
    update: (features: any) => void
    features?: Feature[]
}