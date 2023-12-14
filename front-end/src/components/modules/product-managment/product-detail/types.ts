import { Features } from "@/models/features"

export interface Props {
    update: (features: any) => void
    features?: Features
}